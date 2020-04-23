'use strict'

class UpdateUser {
  get rules () {
    const userId = this.ctx.params.id;
    return {
      email: `email|unique:users,email,id,${userId}`,
      password_confirm: 'same:password',
      username: `unique:users,username,id,${userId}`,
      permissions: 'array|not_blank_item|exists:permissions,id',
      roles: 'array|not_blank_item|exists:roles,id',
    }
  }

  get messages () {
    return {
      'email.email': 'Email không đúng định dạng.',
      'email.unique': 'Email này đã được sử dụng.',
      'username.unique': 'Tên đăng nhập này đã được sử dụng.',
      'password_confirm.same': 'Xác nhận password không đúng',
      'permissions.exists': 'Quyền không tồn tại',
      'roles.exists': 'Vai trò không tồn tại',
      'roles.not_blank_item': 'Vai trò không được để blank',
      'permissions.not_blank_item': 'Quyền không được để blank',
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = UpdateUser
