'use strict'

class StoreRole {
  get rules () {
    return {
      name: 'required|unique:roles',
      permissions: 'array|exists:permissions,id'
    }
  }

  get messages () {
    return {
      'name.unique': 'Vai trò này đã được sử dụng.',
      'name.required': 'Tên vai trò là trường bắt buộc',
      'permissions.array': 'Danh sách quyền phải là mảng',
      'permissions.exists': 'Quyền không tồn tại',
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreRole
