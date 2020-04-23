'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvincialsSchema extends Schema {
  up() {
    this.create('provincials', (table) => {
      table.increments('id')
      table.string('name')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('provincials')
  }
}

module.exports = ProvincialsSchema
