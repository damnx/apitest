'use strict'
const Post = use('App/Models/Post');

class PostService {
    static async paginate(params) {

        const posts = Post.query()
        if (params.topic_id) {
            posts.whereHas('topics', (builder) => {
                builder.where('topics.id', params.topic_id);
                builder.whereNull('deleted_at')
            });
        }
        posts.with('topics', (builder) => {
            builder.whereNull('deleted_at')
        });

        if (params.name) {
            posts.where('name', 'LIKE', '%' + params.name + '%');
        }

        return await posts.whereNull('deleted_at').orderBy('id', 'desc').paginate(1, 20);

    }

    async uploadFile(file) {
        const profilePic = file;
        await profilePic.move(Helpers.tmpPath('uploads'), {
            overwrite: true
        })
        if (!profilePic.moved()) {
            return profilePic.error()
        }

        console.log(profilePic);
        //return 'File moved'
    }


    static async create(person, topicId, file) {
        uploadFile(file);
        // let post = await Post.create(person);
        // await post.topics().sync(topicId);
        // post.topics = await post.topics().fetch();
        // return post;
    }

    static async updatePost(id, person, topicId) {
        let post = await Post.find(id);
        if (!post) {
            return null;
        }
        post.merge(person);
        await post.save();
        await post.topics().sync(topicId);
        post.topics = await post.topics().fetch();
        return post;
    }

    static async getById(id) {
        return await Post
            .query()
            .with('topics', (builder) => {
                builder.whereNull('deleted_at')
            })
            .where('id', id)
            .whereNull('deleted_at')
            .first()
    }

    static async delete(id) {
        let post = await Post.find(id);
        if (post) {
            post.merge({ deleted_at: new Date() });
            const isUpdate = await post.save();
            if (isUpdate) {
                return post;
            }
        }
        return null;
        //throw new Error("Can't update");
    }
}

module.exports = PostService