import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNotNull,
} from 'graphql'
import { globalIdField } from 'graphql-relay'

const MeType = new GraphQLObjectType({
  name: 'Me',
  description: 'This is you.',
  fields: () => ({
    id: globalIdField('Me'),
    email: { type: new GraphQLNotNull(GraphQLString) },
    name: {
      type: GraphQLString,
      description: 'Your name.',
    },
  }),
})

export default MeType
