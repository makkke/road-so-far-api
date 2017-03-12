import { convertLitersToGallons } from './utils'

export const schema = [`
enum QuantityUnit {
  LITER GALLON
}

enum RegionCode {
  AB BC MB NB NL NT NS NU ON PE QC SK YT
  AL AK AS AZ AR CA CO CT DE DC FM FL GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX UT VT VI VA WA WV WI WY
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
  region: RegionCode!
  city: String!
  createdAt: String!
}

input FuelPurchaseInput {
  quantity: QuantityInput!
  region: RegionCode!
  city: String!
  createdAt: String!
}
`]
export const resolvers = {
  FuelPurchase: {
    quantity: (root, args) => {
      const { unit } = args
      const quantity = unit === 'LITER' ? root.quantity : convertLitersToGallons(root.quantity)

      return { value: quantity, unit }
    },
  },
}

export default {}
