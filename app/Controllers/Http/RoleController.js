'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
const RoleService = use('App/Services/RoleService')
const MethodNotAllowException = use('App/Exceptions/MethodNotAllowException')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async index({ request, response }) {
    const query = request.get();
    let roles = await RoleService.getAll(query);
    response.json({
      error: 0,
      data: roles,
      msg: null
    })
  }

  /**
   * Create/save a new role.
   * POST roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const roleData = request.only([
      'name',
      'permissions'
    ]);
    const role = await RoleService.create(roleData);
    response.json({
      error: 0,
      data: role,
      msg: null
    })
  }

  /**
   * Display a single role.
   * GET roles/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * 
   */
  async show({ params, response }) {
    const id = Number(params.id);

    const role = await RoleService.getByIdOrFail(id);
    response.json({
      error: 0,
      data: role,
      msg: null
    })
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async update({ params, request, response }) {
    const roleData = request.only([
      'name',
      'permissions'
    ]);
    const id = params.id;
    const role = await RoleService.update({ id, ...roleData });
    response.json({
      error: 0,
      data: role,
      msg: null
    })
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   *
   * @param {Response} ctx.response
   * @param {object} ctx
   */
  async destroy({ params, response }) {
    const role = await RoleService.delete(params.id)
    response.json({
      error: 0,
      data: role,
      msg: null
    })
  }

  async addPermissions({params, request, response}) {
    const id = params.id
    const {permissions} = request.only(['permissions'])
    const role = await RoleService.addPermissions(id, permissions);
    response.json({
      error: 0,
      data: role,
      msg: null
    })
  }
}

module.exports = RoleController
