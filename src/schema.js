import fs from 'fs'
import { join } from 'path'
import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'

import { schema as fuelPurchasesSchema, resolvers as fuelPurchasesResolvers } from './fuelPurchases'
import { createFuelPurchase, queryFuelPurchases, findFuelPurchaseById } from './fuelPurchases/model'
import { mapQuantityToLiters } from './fuelPurchases/utils'

const rootSchema = [fs.readFileSync(join(__dirname, 'schema.graphql'), 'utf-8')]
const rootResolvers = {
  Query: {
    fuelPurchases: (root, args, context) => queryFuelPurchases(context.user.id),
    fuelPurchase: (root, args) => findFuelPurchaseById(args.id),
    currentUser(root, args, context) {
      return context.user || null
    },
  },
  Mutation: {
    createFuelPurchase: async (root, { input }, context) => {
      const { quantity } = input
      const quantityInLiters = mapQuantityToLiters(quantity)
      const fuelPurchase = await createFuelPurchase(context.user.id, {
        ...input,
        quantity: quantityInLiters,
      })

      return fuelPurchase
    },
  },
}

const schema = [...rootSchema, ...fuelPurchasesSchema]
const resolvers = merge(rootResolvers, fuelPurchasesResolvers)

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
})

export default executableSchema
