import Joi from 'joi'

export default {
  create: {
    body: {
      region: Joi.string().required(),
      volume: Joi.number().required(),
      total: Joi.number().required(),
      createdAt: Joi.date().iso().required(),
    },
  },

  update: {
    body: {
      region: Joi.string().required(),
      volume: Joi.number().required(),
      total: Joi.number().required(),
      createdAt: Joi.date().iso().required(),
    },
    params: {
      fuelPurchaseId: Joi.string().hex().required(),
    },
  },
}
