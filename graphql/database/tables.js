import dynogels from 'dynogels'
import Joi from 'joi'

// const moistureTableName = process.env.moistureTableName
//
// if(!moistureTableName) {
//   throw new Error("Missing moisture table name")
// }

const FuelPurchase = dynogels.define('FuelPurchase', {
  hashKey: 'FuelPurchaseId',
  timestamps: true,
  schema: {
    FuelPurchaseId: dynogels.types.uuid(),
    Volume: Joi.number(),
  },
  tableName: 'fuelPurchases',
})

export default {
  FuelPurchase,
}
