import { Router } from 'express'
import validate from 'express-validation'
import jwt from 'express-jwt'

import config from '../../config/config'
import validator from '../validators/fuelPurchases.validator'
import controller from '../controllers/fuelPurchases.controller'

const auth = jwt({
  secret: config.jwt.secret,
})
const router = new Router()

router.route('/')
  .get(auth, controller.index)
  .post(auth, validate(validator.create), controller.create)

router.route('/:fuelPurchaseId')
  .get(auth, controller.show)
  .put(auth, validate(validator.update), controller.update)
  .delete(auth, controller.remove)

// load service when API with fuelPurchaseId route parameter is called
router.param('fuelPurchaseId', controller.load)

export default router
