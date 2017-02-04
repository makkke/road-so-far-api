import { GraphQLObjectType, GraphQLString } from 'graphql'
// import MeType from './me'
// import UserType from './user'
// import db from '../database'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    me: {
      // type: MeType,
      type: GraphQLString,
      resolve: () => 'privet',
    },
    // viewer: {
    //   type: UserType,
    //   resolve: (_, _args, context) => db.getViewer({}, context),
    // },
  }),
})

export default QueryType
