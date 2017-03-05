'use strict' // eslint-disable-line

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
  console.log('event', event.principalId)
  console.log('context', context)
  graphql(event.body.query, event.body.variables)
    .then(response => callback(null, response))
    .catch(error => callback(error))
}
