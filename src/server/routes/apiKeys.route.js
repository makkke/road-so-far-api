import { Router } from 'express'
import jwt from 'express-jwt'

import config from '../../config/config'
import controller from '../controllers/apiKeys.controller'

const auth = jwt({
  secret: config.jwt.secret,
})
const router = new Router()

router.route('/')
  .get(auth, controller.index)
  .post(auth, controller.create)

router.route('/:apiKeyId')
  .delete(auth, controller.remove)

router.param('apiKeyId', controller.load)

export default router
