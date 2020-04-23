'use strict'

class Provincial {
  get rules() {
    return {
      name: 'required|max:255'
    }
  }

  get messages() {
    return {
      "name.required": 'Tên tỉnh thành bắt buộc',
      "name.max": 'Tên tỉnh thành không được vượt quá 255 ký tự'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send({ error: 1, data: errorMessages, "msg": "Dữ liệu không hợp lệ !" })
  }
}

module.exports = Provincial
