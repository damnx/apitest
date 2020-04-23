'use strict'
const UserService = use('App/Services/UserService')
const User = use('App/Models/User')

class UserController {
    async index({request, response}) {
        const query = request.get();
        const users = await UserService.getAll(query);
        response.json({
            error: 0,
            data: users,
            msg: null
        })
    }

    async show({ params, response }) {
        const id = Number(params.id);
        
        const user = await UserService.getByIdOrFail(id);

        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async store({ request, response }) {
        const person = request.only([
            'email',
            'username',
            'password',
            'address',
            'province_id',
            'district_id',
            'school_id'
        ]);

        const user = await UserService.create(person);

        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async update({response, request, params}) {
        const person = request.only([
            'email',
            'username',
            'address',
            'province_id',
            'district_id',
            'school_id'
        ]);
        const id = params.id;
        const user = await UserService.update({id, ...person});

        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async destroy({params, response}) {
        const user = await UserService.delete(params.id)
        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async addPermissions({params, response, request}) {
        const id = params.id
        const {permissions} = request.only(['permissions'])
        const user = await UserService.addPermissions(id, permissions);
        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async addRoles({params, response, request}) {
        const id = params.id
        const {roles} = request.only(['roles'])
        const user = await UserService.addRoles(id, roles);
        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async updateRoles({params, response, request}) {
        const id = params.id
        const {roles} = request.only(['roles'])
        const user = await UserService.updateRoles(id, roles);
        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }

    async updatePermissions({params, response, request}) {
        const id = params.id
        const {permissions} = request.only(['permissions'])
        const user = await UserService.updatePermissions(id, permissions);
        response.json({
            error: 0,
            data: user,
            msg: null
        })
    }
}

module.exports = UserController
