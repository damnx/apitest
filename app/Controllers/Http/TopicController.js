'use strict'
const TopicService = use('App/Services/TopicService')

class TopicController {
    async index({ request, response }) {
        try {
            const data = request.only(['page', 'name']);
            const topic = await TopicService.paginate(data);
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
                'name'
            ]);
            const topic = await TopicService.create(person);
            return response.json({
                error: 0,
                data: topic,
                "msg": "Thêm dữ liệu thành công !"
            });
        } catch (error) {
            console.log('error', error);
            return response.status(500).json({
                error: 1,
                data: error,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async update({ params, request, response }) {
        const person = request.only([
            'name'
        ]);
        const id = params.id;
        let topic = await TopicService.update({ id, ...person });
        return response.json({
            error: 0,
            data: topic,
            "msg": "Sửa dữ liệu thành công !"
        });
    }


    async destroy({ params, request, response }) {
        let topic = await TopicService.delete(params.id)
        return response.json({
            error: 0,
            data: topic,
            "msg": "Xoá dữ liệu thành công !"
        });
    }

    async show({ params, request, response }) {
        const id = Number(params.id);

        let topic = await TopicService.getById(id);
        if (topic) {
            return response.json({
                error: 0,
                data: topic,
                "msg": "Lấy dữ liệu thành công !"
            });
        }
        return response.status(404).json({
            error: 1,
            data: topic,
            "msg": "Không tìn thấy dữ liệu !"
        });
    }
}

module.exports = TopicController
