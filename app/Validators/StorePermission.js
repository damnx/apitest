'use strict'

class StorePermission {
  get rules () {
    return {
      name: 'required|unique:permissions',
    }
  }

  get messages () {
    return {
      'name.unique': 'Vai trò này đã được sử dụng.',
      'name.required': 'Tên vai trò là trường bắt buộc',
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StorePermission
