'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.renameTable('user_roles', 'user_role');
  }

  down () {
    this.renameTable('user_role', 'user_roles');
  }
}

module.exports = UserRoleSchema
