'use strict'
const Topic = use('App/Models/Topic');

class TopicService {
    static async paginate(params) {
        let page = 1;
        const pageSize = 20;
        if (params.page) {
            page = params.page;
        }
        let topic;
        if (params.name) {
            topic = await Topic.query().where('name', 'LIKE', '%' + params.name + '%').whereNull('deleted_at').orderBy('id', 'desc').paginate(page);
        } else {
            topic = await Topic.query().whereNull('deleted_at').orderBy('id', 'desc').paginate(page, pageSize);
        }
        return topic
    }

    static async create(person) {
        return await Topic.create(person);
    }

    static async update({ id, ...person }) {
        let topic = await Topic.findOrFail(id);
        topic.merge(person);
        const isUpdate = await topic.save();
        if (isUpdate) {
            return topic;
        }

        throw new Error("Can't update");
    }

    static async delete(id) {
        let topic = await Topic.findOrFail(id);
        topic.merge({ deleted_at: new Date() });
        const isUpdate = await topic.save();
        if (isUpdate) {
            return topic;
        }

        throw new Error("Can't update");
    }

    static async getById(id) {
        return await Topic.query().where('id', id).whereNull('deleted_at').first()
    }
}

module.exports = TopicService