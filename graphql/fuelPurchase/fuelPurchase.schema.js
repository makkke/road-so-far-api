// import { getAddress, getAllAddresses } from './addresses.model'
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
    fuelPurchase(id: Int!): FuelPurchase
  }
  type Mutation {
    createFuelPurchase(volume: Float!): FuelPurchase
  }
`

export const fuelPurchaseRoot = {
  fuelPurchase: ({ id }) => fuelPurchases.find(x => x.id === id),
  createFuelPurchase: ({ volume }) => {
    const fuelPurchase = {
      id: fuelPurchases.length,
      volume,
    }
    fuelPurchases.push(fuelPurchase)

    return fuelPurchase
  },
}

export default {
  fuelPurchaseSchema,
  fuelPurchaseRoot,
}
