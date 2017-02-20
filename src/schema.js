import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'

import { schema as fuelPurchasesSchema, resolvers as fuelPurchasesResolvers } from './fuelPurchases/schema'
import { queryFuelPurchases, findFuelPurchaseById, createFuelPurchase } from './fuelPurchases/model'

const rootSchema = [`
type User {
  id: String!
}

type Query {
  # List fuel purchases
  fuelPurchases: [FuelPurchase]

  # View fuel purchase details
  fuelPurchase(id: ID!): FuelPurchase

  # View logged in user
  currentUser: User
}

type Mutation {
  createFuelPurchase(input: FuelPurchaseInput!): FuelPurchase
}

schema {
  query: Query
  mutation: Mutation
}
`]

const rootResolvers = {
  Query: {
    fuelPurchases: (root, args, context) => queryFuelPurchases(context.user.id),
    fuelPurchase: (root, args) => findFuelPurchaseById(args.id),
    currentUser(root, args, context) {
      return context.user || null
    },
  },
  Mutation: {
    createFuelPurchase: (root, args, context) => createFuelPurchase(args.input, context.user.id),
  },
}

const schema = [...rootSchema, ...fuelPurchasesSchema]
const resolvers = merge(rootResolvers, fuelPurchasesResolvers)

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
})

export default executableSchema
