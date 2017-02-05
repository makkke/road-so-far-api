import { GraphQLObjectType, GraphQLFloat } from 'graphql'
import { globalIdField } from 'graphql-relay'

const FuelPurchaseType = new GraphQLObjectType({
  name: 'FuelPurchase',
  description: 'Fuel purchase',
  fields: () => ({
    id: globalIdField('FuelPurchase'),
    volume: { type: GraphQLFloat },
  }),
})

export default FuelPurchaseType
