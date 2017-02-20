import { litersToGallons } from '../utils/convert'

export const schema = [`
enum QuantityUnit {
  LITER
  GALLON
}

type Quantity {
  value: Float!
  unit: QuantityUnit!
}

input QuantityInput {
  value: Float!
  unit: QuantityUnit!
}

type FuelPurchase {
  id: ID!
  quantity(unit: QuantityUnit = LITER): Quantity!
  createdAt: String!
}

input FuelPurchaseInput {
  quantity: QuantityInput!
}

type Location {
  country: String!
  region: String!
}
`]

export const resolvers = {
  FuelPurchase: {
    quantity: (root, args) => {
      const { unit } = args
      const quantity = unit === 'LITER' ? root.quantity : litersToGallons(root.quantity)

      return { value: quantity, unit }
    },
  },
}

export default {}
