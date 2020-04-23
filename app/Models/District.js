'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class District extends Model {
    static get table() {
        return 'districts'
    }
    static get primaryKey() {
        return 'id'
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

    provincials() {
        return this.belongsTo('App/Models/Provincial','provincial_id','id')
    }
}

module.exports = District
