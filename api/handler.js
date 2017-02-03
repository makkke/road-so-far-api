'use strict' // eslint-disable-line

const auth = require('./auth/index').default // eslint-disable-line import/no-unresolved
const graphql = require('./graphql/index').default // eslint-disable-line import/no-unresolved

module.exports.auth = (event, context, callback) => {
  auth(event)
    .then(response => callback(null, response))
    .catch(error => callback(error))
}

module.exports.graphql = (event, context, callback) => {
  graphql(event.body.query, event.body.variables)
    .then(response => callback(null, response))
    .catch(error => callback(error))
}
