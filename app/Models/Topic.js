'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Topic extends Model {
    static get table() {
        return 'topics'
    }
    static get primaryKey() {
        return 'id'
    }
    static get visible() {
        return ['id', 'name']
    }
    static get incrementing() {
        return true
    }

    static get updatedAtColumn() {
        return 'updated_at'
    }

    static get createdAtColumn() {
        return 'created_at'
    }

    posts() {
        return this.belongsToMany('App/Models/Post', 'topic_id', 'post_id', 'id', 'id').pivotTable('topic_posts')
    }
}

module.exports = Topic
