'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DistrictsSchema extends Schema {
  up() {
    this.create('districts', (table) => {
      table.increments('id')
      table.integer('provincial_id')
      table.string('name')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
      // table.foreign('provincial_id').references('provincials.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('districts')
  }
}

module.exports = DistrictsSchema
