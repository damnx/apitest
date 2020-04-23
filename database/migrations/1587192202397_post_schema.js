'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments('id')
      table.string('name')
      table.string('slug')
      table.text('thumbnail')
      table.text('describe')
      table.text('content')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
