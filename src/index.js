import express from 'express'
import { graphqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import cors from 'cors'

import log from './utils/log'
import config from './config'
import schema from './schema'
import dynamodbConnector from './connectors/dynamodb'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

dynamodbConnector.connect()

const auth = jwt({
  audience: process.env.AUTH0_CLIENT_ID,
  secret: process.env.AUTH0_CLIENT_SECRET,
})

app.use('/graphql', auth, graphqlExpress((req) => {
  const query = req.query.query || req.body.query
  if (query && query.length > 2000) {
    throw new Error('Query too large.')
  }

  const user = {
    id: req.user.sub,
  }

  return {
    schema,
    context: {
      user,
    },
  }
}))

app.use((err, req, res, next) => { // eslint-disable-line
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized', err })
    return
  }

  res.status(500).json(err)
})

const port = config.port
app.listen(port, () => log.info('API started 🚀 ', { port }))
