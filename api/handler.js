'use strict' // eslint-disable-line

require('babel-polyfill') // needed to for async/await

// Load local configuration to environment
require('dotenv').config()

const auth = require('./auth/index').default // eslint-disable-line
const graphql = require('./graphql/index').default // eslint-disable-line

module.exports.auth = (event, context, callback) => {
  auth(event)
    .then(response => callback(null, response))
    .catch(error => callback(error))
}

module.exports.graphql = (event, context, callback) => {
  graphql(event.body.query, event.body.variables, {
    user: { id: event.principalId },
  })
    .then(response => callback(null, response))
    .catch(error => callback(error))
}
