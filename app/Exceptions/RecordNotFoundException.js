'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Can\'t find the record'
const status = 404
const code = 'E_RECORD_NOT_FOUND'


class RecordNotFoundException extends LogicalException {
  constructor () {
    super(message, status, code)
  }

  handle (error, { response }) {
    response
      .status(status)
      .json({
        error: status,
        data: null,
        msg: "Không tìm thấy dữ liệu"
      })
  }
}

module.exports = RecordNotFoundException
