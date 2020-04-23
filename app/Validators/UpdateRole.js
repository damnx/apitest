'use strict'

class UpdateRole {
  get rules () {
    const roleId = this.ctx.params.id
    return {
      name: `unique:roles,name,id,${roleId}`,
      permissions: 'array|exists:permissions,id',
    }
  }

  get messages () {
    return {
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

module.exports = UpdateRole
