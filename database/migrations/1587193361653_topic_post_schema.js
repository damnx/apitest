'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicPostSchema extends Schema {
  up() {
    this.create('topic_posts', (table) => {
      table.increments('id')
      table.integer('topic_id')
      table.integer('post_id')
    })
  }

  down() {
    this.drop('topic_posts')
  }
}

module.exports = TopicPostSchema
