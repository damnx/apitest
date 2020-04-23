'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    roles () {
        return this.belongsToMany(
            'App/Models/Role',
            'permission_id',
            'role_id'
        )
        .pivotTable('role_permission')
        .pivotPrimaryKey(null)
    }
}

module.exports = Permission
