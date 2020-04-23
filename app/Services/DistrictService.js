'use strict'
const District = use('App/Models/District');

class DistrictService {
    static async paginate(params) {
        let page = 1;
        const pageSize = 20;
        if (params.page) {
            page = params.page;
        }
        let district;
        if (params.name) {
            district = await District
                .query()
                .with('provincials', (builder) => {
                    builder.whereNull('deleted_at')
                })
                .where('name', 'LIKE', '%' + params.name + '%')
                .whereNull('deleted_at')
                .orderBy('id', 'desc')
                .paginate(page);
        } else {
            district = await District
                .query()
                .with('provincials', (builder) => {
                    builder.whereNull('deleted_at')
                })
                .whereNull('deleted_at')
                .orderBy('id', 'desc')
                .paginate(page, pageSize);
        }
        return district
    }

    static async create(person) {
        return await District.create(person);
    }

    static async update({ id, ...person }) {
        let district = await District.findOrFail(id);
        district.merge(person);

        const isUpdate = await district.save();
        if (isUpdate) {
            return district;
        }

        throw new Error("Can't update");
    }

    static async delete(id) {
        let district = await District.findOrFail(id);
        district.merge({ deleted_at: new Date() });
        const isUpdate = await district.save();
        if (isUpdate) {
            return district;
        }

        throw new Error("Can't update");
    }

    static async getById(id) {
        return await District
            .query()
            .with('provincials', (builder) => {
                builder.whereNull('deleted_at')
            })
            .where('id', id)
            .whereNull('deleted_at')
            .first()
    }
}

module.exports = DistrictService