'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Method not allowed'
const status = 405
const code = 'E_METHOD_NOT_ALLOWED'

class MethodNotAllowException extends LogicalException {
  constructor () {
    super(message, status, code)
  }

  handle (error, { response }) {
    response
      .status(status)
      .json({
        error: status,
        data: null,
        msg: "Không được phép truy cập"
      })
  }
}

module.exports = MethodNotAllowException
