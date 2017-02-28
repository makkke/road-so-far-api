import dynogels from 'dynogels'
import Joi from 'joi'

import log from '../utils/log'

export const FuelPurchase = dynogels.define('FuelPurchase', {
  hashKey: 'userId',
  rangeKey: 'id',
  timestamps: true,
  schema: {
    id: dynogels.types.uuid(),
    userId: Joi.string(),
    quantity: Joi.number(), // in litres
    region: Joi.string(),
    city: Joi.string(),
  },
  indexes: [{
    hashKey: 'userId', rangeKey: 'createdAt', name: 'CreatedAtIndex', type: 'global',
  }],
  tableName: 'fuelPurchases',
})

const connect = () => {
  dynogels.AWS.config.update({ region: 'us-west-2' })
  dynogels.dynamoDriver(new dynogels.AWS.DynamoDB({ endpoint: 'http://localhost:8000' }))

  dynogels.createTables((err) => {
    if (err) {
      log.error('Could not create tables', err)
      return
    }

    log.info('Tables has been created')
  })
}

export default { connect }
