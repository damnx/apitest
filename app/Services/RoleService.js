'use strict'

const model = use('App/Models/Role');
const BaseService = use('App/Services/BaseService')

class RoleService extends BaseService {
    constructor() {
        super(model)
    }

    async create(data) {
        let roleData = { name: data.name }
        let role = await super.create(roleData);
        if(data.permissions && data.permissions.length > 0) {
            await role.permissions().attach(data.permissions);
        }
        await role.load('permissions')

        return role;
    }

    async update({ id, permissions, ...data }) {
        let role = await super.update({ id, ...data });
        if(permissions && permissions.length > 0) {
            await role.permissions().detach();
            await role.permissions().attach(permissions);
        }
        await role.load('permissions')

        return role;
    }

    async addPermissions(id, permissions) {
        let role = await super.getByIdOrFail(id);
        if(!permissions) return role;
        let rolePermissions = (await role.permissions().fetch()).toJSON();
        for(let i in permissions) {
            let id = permissions[i]
            for( let ii in rolePermissions) {
                let permission = rolePermissions[ii]
                if(permission.id == id) {
                    let index = permissions.indexOf(id);
                    permissions.splice(index, 1);
                }
            }
        }

        if(permissions.length > 0) {
            await role.permissions().attach(permissions);
        }
        await role.load('permissions')

        return role;
    }
}

module.exports = new RoleService()