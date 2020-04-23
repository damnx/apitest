'use strict'
const School = use('App/Models/School');

class SchoolService {
    static async paginate(params) {
        let page = 1;
        const pageSize = 20;
        if (params.page) {
            page = params.page;
        }
        let school;
        if (params.name) {
            school = await School
                .query()
                .with('district', (builder) => {
                    builder.whereNull('deleted_at')
                })
                .where('name', 'LIKE', '%' + params.name + '%')
                .whereNull('deleted_at')
                .orderBy('id', 'desc')
                .paginate(page);
        } else {
            school = await School
                .query()
                .with('district', (builder) => {
                    builder.whereNull('deleted_at')
                })
                .whereNull('deleted_at')
                .orderBy('id', 'desc')
                .paginate(page, pageSize);
        }
        return school
    }

    static async create(person) {
        return await School.create(person);
    }

    static async update({ id, ...person }) {
        let school = await School.findOrFail(id);
        school.merge(person);

        const isUpdate = await school.save();
        if (isUpdate) {
            return school;
        }

        throw new Error("Can't update");
    }

    static async delete(id) {
        let school = await School.findOrFail(id);
        school.merge({ deleted_at: new Date() });
        const isUpdate = await school.save();
        if (isUpdate) {
            return school;
        }

        throw new Error("Can't update");
    }

    static async getById(id) {
        return await School
            .query()
            .where('id', id)
            .with('district', (builder) => {
                builder.whereNull('deleted_at')
            })
            .whereNull('deleted_at')
            .first()
    }
}

module.exports = SchoolService