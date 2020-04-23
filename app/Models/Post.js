'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static get table() {
        return 'posts'
    }

    static get primaryKey() {
        return 'id'
    }

    static get visible() {
        return ['id', 'name', 'slug', 'thumbnail', 'describe', 'content', 'topics']
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


    topics() {
        return this.belongsToMany('App/Models/Topic', 'post_id', 'topic_id', 'id', 'id').pivotTable('topic_posts')
    }
}

module.exports = Post
