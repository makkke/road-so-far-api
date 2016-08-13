import Promise from 'bluebird'
import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'


const FuelPurchaseSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  region: String,
  volume: Number,
  total: Number,
  createdAt: Date,

})

/**
 * Statics
 */
FuelPurchaseSchema.statics = {
  get(id) {
    return this.findById(id).execAsync()
      .then(fuelPurchase => {
        if (fuelPurchase) return fuelPurchase

        const err = new APIError('Fuel purchase is not found', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },
}

FuelPurchaseSchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.user
  },
})

export default mongoose.model('FuelPurchase', FuelPurchaseSchema)
