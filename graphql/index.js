import { graphql } from 'graphql'
import schema from './schema'

export default (query, variables) => (
  graphql(schema, query, null, {}, variables)
)
