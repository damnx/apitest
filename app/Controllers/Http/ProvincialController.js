'use strict'
const Provincial = use('App/Models/Provincial');

class ProvincialController {

    async index({ request, response }) {

        try {
            const pageSize = 20;
            const data = request.only(['page', 'name']);
            let page = 1;
            if (data.page) {
                page = data.page;
            }
            let provincial;
            if (data.name) {
                provincial = await Provincial.query().where('name', 'LIKE', '%' + data.name + '%').whereNull('deleted_at').orderBy('id', 'desc').paginate(page);
            } else {
                provincial = await Provincial.query().whereNull('deleted_at').orderBy('id', 'desc').paginate(page, pageSize);
            }
            return response.json({
                error: 0,
                data: provincial,
                "msg": "Lấy danh sách dự liệu thành côngÏ !"
            });
        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: error,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async store({ request, response }) {
        try {
            const input = request.all();

            const provincial = new Provincial();

            provincial.name = input.name;

            if (await provincial.save()) {
                return response.json({
                    error: 0,
                    data: [
                        input
                    ],
                    "msg": "Thêm tỉnh thành thành công !"
                });
            }

            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });

        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async update({ params, request, response }) {
        try {
            const input = request.all();
            const id = params.id;
            let provincial = await Provincial.find(id);
            provincial.name = input.name;

            await provincial.save();

            return response.json({
                error: 0,
                data: [
                    input
                ],
                "msg": "Sửa thành công !"
            });
        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: null,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async destroy({ params, request, response }) {
        try {
            const { id } = params;
            let provincial = await Provincial.find(id);
            provincial.deleted_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            await provincial.save();
            //await provincial.delete();

            return response.json({
                error: 0,
                data: [
                    id
                ],
                "msg": "Xoá thành công !"
            });
        } catch (error) {
            return response.status(500).json({
                error: 1,
                data: error,
                "msg": "Lỗi hệ thống !"
            });
        }
    }

    async show({ params, request, response }) {
        const id = Number(params.id);
        let provincial = await Provincial.query().where('id', id).whereNull('deleted_at').first()
        if (provincial) {
            return response.json({
                error: 0,
                data: provincial,
                "msg": "Lấy dữ liệu thành công !"
            });
        }
        return response.status(404).json({
            error: 1,
            data: provincial,
            "msg": "Không tìn thấy dữ liệu !"
        });
    }

}

module.exports = ProvincialController
