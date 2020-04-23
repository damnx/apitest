'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('user_roles', (table) => {
      table.integer('role_id')
      table.integer('user_id')
      table.timestamp('deleted_at')
      table.timestamps()
      table.primary(['role_id', 'user_id'])
    })
  }

  down () {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
