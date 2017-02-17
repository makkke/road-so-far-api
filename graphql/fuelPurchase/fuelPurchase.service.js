import dynogels from 'dynogels'
import Joi from 'joi'

dynogels.AWS.config.update({ region: 'us-west-2' })
dynogels.dynamoDriver(new dynogels.AWS.DynamoDB({ endpoint: 'http://localhost:8000' }))

const FuelPurchase = dynogels.define('FuelPurchase', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: dynogels.types.uuid(),
    volume: Joi.number(),
  },
  tableName: 'fuelPurchases',
})

dynogels.createTables((err) => {
  if (err) {
    console.log('Error creating tables: ', err)
  } else {
    console.log('Tables has been created')
  }
})

export const getAll = () => {
  return new Promise((resolve, reject) => {
    FuelPurchase
      .scan()
      .loadAll()
      .exec((err, result) => {
        if (err) {
          reject(err)
          return
        }

        resolve(result.Items.map(x => x.attrs))
      })
  })
}

export const create = ({ volume }) => {
  console.log(volume)
  return new Promise((resolve, reject) => {
    const fuelPurchase = new FuelPurchase({ volume })
    fuelPurchase.save((err) => {
      if (err) {
        reject(err)
        return
      }
      console.log(fuelPurchase)
      resolve(fuelPurchase.attrs)
    })
  })
}

export default {
  getAll,
}
