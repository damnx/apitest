'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class School extends Model {
    static get table() {
        return 'schools'
    }
    static get primaryKey() {
        return 'id'
    }
    static get visible() {
        return ['id', 'name', 'district_id']
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

    district() {
        return this.belongsTo('App/Models/District', 'district_id', 'id')
    }
}

module.exports = School
