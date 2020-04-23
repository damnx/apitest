'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPermissionSchema extends Schema {
  up () {
    this.create('user_permission', (table) => {
      table.integer('permission_id')
      table.integer('user_id')
      table.timestamp('deleted_at')
      table.timestamps()
      table.primary(['permission_id', 'user_id'])
    })
  }

  down () {
    this.drop('user_permission')
  }
}

module.exports = UserPermissionSchema
