'use strict'
const SchoolService = use('App/Services/SchoolService')

class SchoolController {
    async index({ request, response }) {
        try {
            const data = request.only(['page', 'name']);
            const school = await SchoolService.paginate(data);
            return response.json({
                error: 0,
                data: school,
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

    async store({ request, response }) {
        try {
            const person = request.only([
                'name',
                'district_id'
            ]);
            const school = await SchoolService.create(person);
            return response.json({
                error: 0,
                data: school,
                "msg": "Thêm dữ liệu thành công !"
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
        const person = request.only([
            'name',
            'district_id'
        ]);
        const id = params.id;
        let school = await SchoolService.update({ id, ...person });
        return response.json({
            error: 0,
            data: school,
            "msg": "Sửa dữ liệu thành công !"
        });
    }


    async destroy({ params, request, response }) {
        let school = await SchoolService.delete(params.id)
        return response.json({
            error: 0,
            data: school,
            "msg": "Xoá dữ liệu thành công !"
        });
    }

    async show({ params, request, response }) {
        const id = Number(params.id);
        let school = await SchoolService.getById(id);
        if (school) {
            return response.json({
                error: 0,
                data: school,
                "msg": "Lấy dữ liệu thành công !"
            });
        }
        return response.status(404).json({
            error: 1,
            data: school,
            "msg": "Không tìn thấy dữ liệu !"
        });
    }
}

module.exports = SchoolController
