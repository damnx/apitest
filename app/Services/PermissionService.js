'use strict'

const model = use('App/Models/Permission');
const BaseService = use('App/Services/BaseService')

class PermissionService extends BaseService {
    constructor() {
        super(model)
    }

    async getAll(query, limit=100) {
        return await super.getAll(query, limit)
    }
}

module.exports = new PermissionService()