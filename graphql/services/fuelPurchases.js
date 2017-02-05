import dynogels from 'dynogels'
import Joi from 'joi'

const FuelPurchase = dynogels.define('FuelPurchase', {
  hashKey: 'fuelPurchaseId',
  timestamps: true,
  schema: {
    fuelPurchaseId: dynogels.types.uuid(),
    volume: Joi.number(),
  },
  tableName: 'fuelPurchases',
})

const getAll = () => {
  return new Promise((resolve, reject) => {
    FuelPurchase
      .scan()
      .loadAll()
      .exec((err, result) => {
        if (err) {
          reject(new Error('Not able to fetch fuel purchases'))
          return
        }
        resolve(result.Items.map(x => x.attrs))
      })
  })
}

export default {
  getAll,
}
