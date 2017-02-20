import express from 'express'
import graphqlHTTP from 'express-graphql'
import jwt from 'jsonwebtoken'
// import jwt from 'express-jwt'

import log from './utils/log'
import { schema, root } from './graphql/schema'

const app = express()

const auth = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    res.json({ message: 'Unauthorized' })
    return
  }

  const token = header.substring(7) // remove "bearer " from token
  const options = { audience: process.env.AUTH0_CLIENT_ID }
  jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, options, (err, decoded) => {
    if (err) {
      res.json({ message: 'Unauthorized', err })
      return
    }

    req.userId = decoded.sub // eslint-disable-line
    next()
  })
}

// const auth = jwt({
//   audience: process.env.AUTH0_CLIENT_ID,
//   secret: process.env.AUTH0_CLIENT_SECRET,
// })

app.use('/graphql', auth, graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

const port = 8080
app.listen(port, () => log.info('API started 🚀 ', { port }))
