'use strict'

const model = use('App/Models/User');
const BaseService = use('App/Services/BaseService')

class UserService extends BaseService {
    constructor() {
        super(model)
    }

    async updatePermissions(id, permissions) {
        let user = await super.getByIdOrFail(id);
        if(!permissions || permissions.length === 0) {
            return user;
        }

        await user.permissions().detach();
        if(permissions.length > 0) {
            await user.permissions().attach(permissions);
        }

        await user.load('permissions');
        
        return user;
    }

    async updateRoles(id, roles) {
        let user = await super.getByIdOrFail(id);
        if(!roles) {
            return user;
        }

        await user.roles().detach();
        if(roles.length > 0) {
            await user.roles().attach(roles);
        }
        
        await user.load('roles');

        return user;
    }

    async addRoles(id, roles) {
        let user = await super.getByIdOrFail(id);
        if(!roles || roles.length === 0) return user;
        let userRole = (await user.roles().fetch()).toJSON();
        for(let i in userRole) {
            let existRole = userRole[i]
            for(let ii in roles) {
                let id = roles[ii]
                if(existRole.id == id) {
                    let index = roles.indexOf(id);
                    roles.splice(index, 1)
                }
            }
        }
        if(roles.length > 0) {
            await user.roles().attach(roles);
        }

        await user.load('roles');
        
        return user;
    }

    async addPermissions(id, permissions) {
        let user = await super.getByIdOrFail(id);
        if(!permissions || permissions.length === 0) return user;
        let userPermissions = (await user.permissions().fetch()).toJSON();
        for(let i in userPermissions) {
            let existPermissions = userPermissions[i]
            for(let ii in permissions) {
                let id = permissions[ii]
                if(existPermissions.id == id) {
                    let index = permissions.indexOf(id);
                    permissions.splice(index, 1)
                }
            }
        }

        if(permissions.length > 0) {
            await user.permissions().attach(permissions);
        }

        await user.load('permissions');
        
        return user;
    }
}

module.exports = new UserService()