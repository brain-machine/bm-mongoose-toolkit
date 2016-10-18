'use strict'

const Response = require('./mongoose-response-model')

module.exports.getByQuery = function (Model, lean = true) {
  return (query = {}) => {
    return new Promise((resolve, reject) => {
      Model.find(query).lean(lean).exec((err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.findMany(data))
      })
    })
  }
}

module.exports.getOne = function (Model, lean = true) {
  return (query = {}) => {
    return new Promise((resolve, reject) => {
      Model.findOne(query).lean(lean).exec((err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        } else if (!data || data == null) {
          return reject(Response.Error.notFound())
        }
        return resolve(Response.Success.findOne(data))
      })
    })
  }
}

module.exports.getById = function (Model, lean = true) {
  return (_id) => {
    return new Promise((resolve, reject) => {
      let _query = {_id}
      Model.findOne(_query).lean(lean).exec((err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        } else if (!data || data == null) {
          return reject(Response.Error.notFound())
        }
        return resolve(Response.Success.findOne(data))
      })
    })
  }
}

module.exports.create = function (Model) {
  return (value) => {
    return new Promise((resolve, reject) => {
      new Model(value).save((err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.create(data._id))
      })
    })
  }
}

module.exports.update = function (Model) {
  return (_id, value) => {
    return new Promise((resolve, reject) => {
      let _query = {_id}
      Model.update(_query, value, (err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.update(_id))
      })
    })
  }
}

module.exports.remove = function (Model) {
  return (_id) => {
    return new Promise((resolve, reject) => {
      Model.remove({_id}, (err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.remove(_id))
      })
    })
  }
}

module.exports.active = function (Model, property = 'active') {
  return (_id) => {
    return new Promise((resolve, reject) => {
      let value = {}
      value[property] = true

      Model.update({_id}, value, (err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.active(_id))
      })
    })
  }
}

module.exports.inactive = function (Model, property = 'active') {
  return (_id) => {
    return new Promise((resolve, reject) => {
      let value = {}
      value[property] = false

      Model.update({_id}, value, (err, data) => {
        if (err) {
          return reject(Response.Error.mongoose(err))
        }
        return resolve(Response.Success.inactive(_id))
      })
    })
  }
}
