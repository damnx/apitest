'use strict'

class ConvertEmptyStringsToNull {
  async handle({ request }, next) {

    // gọi function validate 
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map(key => ({
          [key]: request.body[key] !== '' ? request.body[key] : null
        }))
      )
    }

    await next()
  }


}

module.exports = ConvertEmptyStringsToNull
