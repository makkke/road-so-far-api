import 'babel-polyfill' // needed to for async/await

import { buildSchema } from 'graphql'
import { mergeStrings } from 'gql-merge'

import { fuelPurchaseSchema, fuelPurchaseRoot } from './fuelPurchase/fuelPurchase.schema'

export const schema = buildSchema(mergeStrings([
  fuelPurchaseSchema,
]))

export const root = { ...fuelPurchaseRoot }

export default {}
