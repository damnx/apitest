'use strict'

class StoreDistrict {
  get rules() {
    return {
      name: 'required|max:255',
      provincial_id: 'required'
    }
  }

  get messages() {
    return {
      "name.required": 'Tên quận huyện bắt buộc',
      "name.max": 'Tên quận huyện không được vượt quá 255 ký tự',
      "provincial_id.required": "Tỉnh thành bắt buộc"
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send({ error: 1, data: errorMessages, "msg": "Dữ liệu không hợp lệ !" })
  }
}

module.exports = StoreDistrict
