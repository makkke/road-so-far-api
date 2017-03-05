import fs from 'fs'
import { join } from 'path'

import { convertLitersToGallons } from './utils'

export const schema = [fs.readFileSync(join(__dirname, 'schema.graphql'), 'utf-8')]
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
