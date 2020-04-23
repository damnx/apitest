'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchoolSchema extends Schema {
  up() {
    this.create('schools', (table) => {
      table.increments('id')
      table.integer('district_id')
      table.string('name')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('schools')
  }
}

module.exports = SchoolSchema
