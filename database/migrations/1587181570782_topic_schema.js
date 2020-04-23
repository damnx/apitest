'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', (table) => {
      table.increments('id')
      table.string('name')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('topics')
  }
}

module.exports = TopicSchema
