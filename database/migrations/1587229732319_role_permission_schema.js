'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolePermissionSchema extends Schema {
  up () {
    this.create('role_permission', (table) => {
      table.integer('role_id')
      table.integer('permission_id')
      table.timestamp('deleted_at')
      table.timestamps()
      table.primary(['role_id', 'permission_id'])
    })
  }

  down () {
    this.drop('role_permission')
  }
}

module.exports = RolePermissionSchema
