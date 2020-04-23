'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TopicPost extends Model {
    static get table() {
        return 'topic_posts'
    }

    static get primaryKey() {
        return 'id'
    }

    static get visible() {
        return ['id', 'topic_id', 'post_id']
    }
}

module.exports = TopicPost
