import express from 'express'
import graphqlHTTP from 'express-graphql'
import log from './utils/log'

import { schema, root } from './graphql/schema'

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

const port = 8080
app.listen(port, () => log.info('API started 🚀 ', { port }))
