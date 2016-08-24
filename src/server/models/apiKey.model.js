import Promise from 'bluebird'
import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'

const ApiKeySchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  token: String,
})

/**
 * Statics
 */
ApiKeySchema.statics = {
  get(id) {
    return this.findById(id).execAsync()
      .then(apiKey => {
        if (apiKey) return apiKey

        const err = new APIError('Api Key is not found', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },
}

ApiKeySchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.user
  },
})

export default mongoose.model('ApiKey', ApiKeySchema)
