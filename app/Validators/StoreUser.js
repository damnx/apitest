'use strict'

class StoreUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      password_confirm: 'same:password',
      username: 'required|unique:users',
      address: 'required',
      province_id: 'required',
      district_id: 'required',
      school_id: 'required',
      // province_id: 'exists:provinces,id',
      // district_id: 'exists:districts,id',
      // school_id: 'exists:schools,id',
    }
  }

  get messages () {
    return {
      'email.required': 'Email là trường bắt buộc.',
      'email.email': 'Email không đúng định dạng.',
      'email.unique': 'Email này đã được sử dụng.',
      'username.unique': 'Tên đăng nhập này đã được sử dụng.',
      'password.required': 'Password là trường bắt buộc',
      'password_confirm.same': 'Xác nhận password không đúng'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = StoreUser
