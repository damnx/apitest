'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
    permissions () {
        return this.belongsToMany(
            'App/Models/Permission',
            'role_id',
            'permission_id'
        )
        .pivotTable('role_permission')
        .pivotPrimaryKey(null)
    }
}

module.exports = Role
