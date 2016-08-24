import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

import config from '../../config/config'
import ApiKey from '../models/apiKey.model'

function index(req, res, next) {
  ApiKey.find({ user: req.user.id })
    .execAsync()
    .then(apiKey => res.json(apiKey))
    .error(e => next(e))
}

function create(req, res, next) {
  const token = jwt.sign({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  }, config.jwt.secret)

  const apiKey = new ApiKey({
    user: req.user.id,
    token,
  })

  apiKey.saveAsync()
    .then(savedApiKey => res.status(httpStatus.CREATED).json(savedApiKey))
    .error(e => next(e))
}

function remove(req, res, next) {
  const apiKey = req.apiKey
  apiKey.removeAsync()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .error(e => next(e))
}

function load(req, res, next, id) {
  ApiKey.get(id)
    .then(apiKey => {
      req.apiKey = apiKey // eslint-disable-line no-param-reassign
      return next()
    })
    .error(e => next(e))
}

export default { index, create, remove, load }
