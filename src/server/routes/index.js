import { Router } from 'express'

import auth from './auth.route'
import fuelPurchases from './fuelPurchases.route'
import apiKeys from './apiKeys.route'

const router = new Router()

router.get('/', (req, res) =>
	res.json()
)

router.use('/auth', auth)
router.use('/fuelPurchases', fuelPurchases)
router.use('/apiKeys', apiKeys)

export default router
