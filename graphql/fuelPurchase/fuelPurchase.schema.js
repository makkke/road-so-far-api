import { getAll, create } from './fuelPurchase.service'
// import addresses from './addresses.dummydata'

const fuelPurchases = [
  { id: 1, volume: 1.5 },
  { id: 2, volume: 2.5 },
  { id: 3, volume: 3.5 },
]

export const fuelPurchaseSchema = `
  type FuelPurchase {
    id: ID!
    volume: Float!
  }
  type Query {
    fuelPurchases: [FuelPurchase]
    fuelPurchase(id: Int!): FuelPurchase
  }
  type Mutation {
    createFuelPurchase(volume: Float!): FuelPurchase
  }
`

export const fuelPurchaseRoot = {
  fuelPurchases: async () => getAll(),
  fuelPurchase: ({ id }) => fuelPurchases.find(x => x.id === id),
  createFuelPurchase: (fuelPurchase) => {
    return create(fuelPurchase)
  },
}

export default {
  fuelPurchaseSchema,
  fuelPurchaseRoot,
}
