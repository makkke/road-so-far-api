import { GraphQLObjectType, GraphQLList } from 'graphql'

// import tables from './database/tables'

// import MeType from './me'
import FuelPurchaseType from './fuelPurchase'
import FuelPurchaseService from '../services/fuelPurchases'

const QueryType = new GraphQLObjectType({
  name: 'RoadSoFarApi',
  description: 'Root of the Schema',
  fields: () => ({
    fuelPurchases: {
      name: 'FuelPurchasesQuery',
      description: 'Retrieve fuel purchases',
      type: new GraphQLList(FuelPurchaseType),
      resolve: () => FuelPurchaseService.getAll(),
    },
  }),
})

export default QueryType
