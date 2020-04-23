'use strict'
const PostService = use('App/Services/PostService')

class PostController {
    async index({ request, response }) {
        try {
            const data = request.only(['page', 'name', 'topic_id']);
            const topic = await PostService.paginate(data);
            return response.json({
                error: 0,
                data: topic,
                "msg": "Lấy danh sách dự liệu thành công !"
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: 1,
                data: error,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async store({ request, response }) {
        try {
            const person = request.only([
                'name',
                'describe',
                'content',
                'slug',
                'thumbnail'
            ]);

            const { topic_id } = request.only(['topic_id'])
            const posts = await PostService.create(person, topic_id);
            return response.json({
                error: 0,
                data: posts,
                "msg": "Lấy danh sách dự liệu thành công !"
            });
        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: error,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async update({ params, request, response }) {
        try {
            const id = params.id;
            const person = request.only([
                'name',
                'describe',
                'content',
                'slug',
                'thumbnail'
            ]);
            const { topic_id } = request.only(['topic_id']);
            const posts = await PostService.updatePost(id, person, topic_id);
            return response.json({
                error: 0,
                data: posts,
                "msg": "Sửa dự liệu thành công !"
            });
        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async show({ params, request, response }) {
        try {
            const id = Number(params.id);
            let post = await PostService.getById(id);
            if (post) {
                return response.json({
                    error: 0,
                    data: post,
                    "msg": "Lấy dữ liệu thành công !"
                });
            }
            return response.status(404).json({
                error: 1,
                data: post,
                "msg": "Không tìn thấy dữ liệu !"
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async destroy({ params, response }) {
        try {
            const post = await PostService.delete(params.id)
            if (post) {
                return response.json({
                    error: 0,
                    data: post,
                    "msg": "Xoá dữ liệu thành công !"
                });
            }
            return response.status(404).json({
                error: 1,
                data: post,
                "msg": "Không tìn thấy dữ liệu !"
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });
        }

    }
}

module.exports = PostController
