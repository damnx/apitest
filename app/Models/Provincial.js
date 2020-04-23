'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provincial extends Model {
    static get table() {
        return 'provincials'
    }
    static get primaryKey() {
        return 'id'
    }
    static get visible() {
        return ['id', 'name', 'delete_at']
    }
    static get incrementing() {
        return false
    }

    static get updatedAtColumn() {
        return 'updated_at'
    }

    static get createdAtColumn() {
        return 'created_at'
    }

    districts() {
        return this.hasMany('App/Models/District', 'id', 'provincial_id')
    }
}

module.exports = Provincial
