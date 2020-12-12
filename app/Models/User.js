'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden() {
    return ['password'];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  roles() {
    return this.belongsToMany(
      'App/Models/Role',
      'user_id',
      'role_id'
    )
      .pivotTable('user_role')
      .pivotPrimaryKey(null)
  }

  permissions() {
    return this.belongsToMany(
      'App/Models/Permission',
      'user_id',
      'permission_id'
    )
      .pivotTable('user_permission')
      .pivotPrimaryKey(null)
  }
}

module.exports = User