'use strict'

class StoreSchool {
  get rules() {
    return {
      name: 'required|max:255',
      district_id: 'required'
    }
  }

  get messages() {
    return {
      "name.required": 'Tên trường bắt buộc',
      "name.max": 'Tên trường không được vượt quá 255 ký tự',
      "district_id.required": "Tên trường bắt buộc"
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send({ error: 1, data: errorMessages, "msg": "Dữ liệu không hợp lệ !" })
  }
}

module.exports = StoreSchool
