'use strict'

const DistrictService = use('App/Services/DistrictService')

class DistrictController {
    async index({ request, response }) {
        try {
            const data = request.only(['page', 'name']);
            const district = await DistrictService.paginate(data);
            return response.json({
                error: 0,
                data: district,
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
                'provincial_id'
            ]);
            const district = await DistrictService.create(person);
            return response.json({
                error: 0,
                data: district,
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
            'provincial_id'
        ]);
        const id = params.id;
        let district = await DistrictService.update({ id, ...person });
        return response.json({
            error: 0,
            data: district,
            "msg": "Sửa dữ liệu thành công !"
        });
    }


    async destroy({ params, request, response }) {
        let district = await DistrictService.delete(params.id)
        return response.json({
            error: 0,
            data: district,
            "msg": "Xoá dữ liệu thành công !"
        });
    }

    async show({ params, request, response }) {
        const id = Number(params.id);
        let district = await DistrictService.getById(id);
        if (district) {
            return response.json({
                error: 0,
                data: district,
                "msg": "Lấy dữ liệu thành công !"
            });
        }
        return response.status(404).json({
            error: 1,
            data: district,
            "msg": "Không tìn thấy dữ liệu !"
        });
    }
}


module.exports = DistrictController
