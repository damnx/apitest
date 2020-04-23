'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const PermissionService = use('App/Services/PermissionService')
/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
  /**
   * Show a list of all permissions.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async index({ request, response }) {
    const query = request.get();
    let permissions = await PermissionService.getAll(query);
    response.json({
      error: 0,
      data: permissions,
      msg: null
    })
  }

  /**
   * Create/save a new permission.
   * POST permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const permissionData = request.only([
      'name'
    ]);
    const permission = await PermissionService.create(permissionData);
    response.json({
      error: 0,
      data: permission,
      msg: null
    })
  }

  /**
   * Display a single permission.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * 
   */
  async show({ params, response }) {
    const id = Number(params.id);

    const permission = await PermissionService.getByIdOrFail(id);
    response.json({
      error: 0,
      data: permission,
      msg: null
    })
  }

  /**
   * Update permission details.
   * PUT or PATCH permissions/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async update({ params, request, response }) {
    const permissionData = request.only([
      'name'
    ]);
    const id = params.id;
    const permission = await PermissionService.update({ id, ...permissionData });
    response.json({
      error: 0,
      data: permission,
      msg: null
    })
  }

  /**
   * Delete a permission with id.
   * DELETE permissions/:id
   *
   * @param {Response} ctx.response
   * @param {object} ctx
   */
  async destroy({ params, response }) {
    const permission = await PermissionService.delete(params.id)
    response.json({
      error: 0,
      data: permission,
      msg: null
    })
  }
}

module.exports = PermissionController
