'use strict'

const RecordNotFoundException = use('App/Exceptions/RecordNotFoundException')

class BaseService {
    constructor(model) {
        this.model = model
    }

    async getAll(query, limit=20) {
        const page = Number(query.page);

        return await this.model.query()
                        .whereNull('deleted_at')
                        .orderBy('id', 'DESC')
                        .paginate(page, limit);
    }

    async getById(id) {
        let user = await this.model.query()
                        .where('id', id)
                        .whereNull('deleted_at')
                        .first();
        return user;
    }

    async getByIdOrFail(id) {
        let user = await this.model.query()
                        .where('id', id)
                        .whereNull('deleted_at')
                        .first();
        if(!user) {
            throw new RecordNotFoundException()
        }   

        return user;
    }

    async getByEmail(email) {
        return await this.model.query()
            .where('email', email)
            .whereNull('deleted_at')
            .first();
    }

    async create( data ) {
        return await this.model.create(data);
    }

    async update ({id, ...data}) {
        let obj = await this.getByIdOrFail(id);
        obj.merge(data);
        await obj.save();

        return obj;
    }

    async delete ( id ) {
        let obj = await this.getByIdOrFail(id);
        obj.merge({deleted_at: new Date()});
        const isUpdate = await obj.save();
        if(isUpdate) {
            return obj;
        }

        throw new Error("Can't delete");
    }
}

module.exports = BaseService