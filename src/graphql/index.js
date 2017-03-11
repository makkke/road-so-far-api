import { graphql } from 'graphql'
import schema from './schema'

export default (query, variables, context) => (
  graphql(schema, query, null, context, variables)
)
