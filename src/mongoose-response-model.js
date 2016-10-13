'use strict'

const HttpStatus = require('http-status-codes')
const Success = {}
const Error = {}
const MONGOOSE_VALIDATION_ERROR = 'ValidationError'
const MONGOOSE_CUSTOM_ERROR = 'user defined'

Success.create = (id, messageKey = 'created') => {
  return {
    status: HttpStatus.CREATED,
    messageKeys: [messageKey],
    data: {_id: id}
  }
}

Success.update = (id, messageKey = 'updated') => {
  return {
    status: HttpStatus.OK,
    messageKeys: [messageKey],
    data: {_id: id}
  }
}

Success.remove = (id, messageKey = 'removed') => {
  return {
    status: HttpStatus.OK,
    messageKeys: [messageKey],
    data: {_id: id}
  }
}

Success.active = (id, messageKey = 'actived') => {
  return {
    status: HttpStatus.OK,
    messageKeys: [messageKey],
    data: {_id: id}
  }
}

Success.inactive = (id, messageKey = 'inactived') => {
  return {
    status: HttpStatus.OK,
    messageKeys: [messageKey],
    data: {_id: id}
  }
}

Success.findOne = (record) => {
  return {
    status: HttpStatus.OK,
    data: record
  }
}

Success.findMany = (records) => {
  return {
    status: HttpStatus.OK,
    data: records
  }
}

Error.unespected = (err, messageKey = 'unespected-error') => {
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    messageKeys: [messageKey],
    data: err
  }
}

Error.business = (err, messageKey = 'unespected-error') => {
  return {
    status: HttpStatus.BAD_REQUEST,
    messageKeys: [messageKey],
    data: err
  }
}

Error.authorizationRequired = (data, messageKey = 'authorization-required') => {
  return {
    messageKeys: [messageKey],
    data,
    status: HttpStatus.UNAUTHORIZED
  }
}

Error.forbidden = (data, messageKey = 'forbidden') => {
  return {
    data,
    messageKeys: [messageKey],
    status: HttpStatus.UNAUTHORIZED
  }
}

Error.notFound = (data, messageKey = 'not-found') => {
  return {
    data,
    messageKeys: [messageKey],
    status: HttpStatus.NOT_FOUND
  }
}

Error.mongoose = (err) => {
  const res = {}

  if (err.name === MONGOOSE_VALIDATION_ERROR) {
    res.status = HttpStatus.BAD_REQUEST
    res.messageKeys = []

    let erros = err.errors
    for (var prop in erros) {
      let validationError = erros[prop]

      if (validationError.kind === MONGOOSE_CUSTOM_ERROR) {
        res.messageKeys.push(validationError.message)
      } else {
        res.messageKeys.push(validationError.path + '-' + validationError.kind)
      }
    }
  } else {
    res.status = HttpStatus.INTERNAL_SERVER_ERROR
    res.messageKey = 'unespected-error'
    res.data = err
  }

  return res
}

module.exports.Success = Success
module.exports.Error = Error
