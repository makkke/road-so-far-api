import { Router } from 'express'

import fuelPurchases from './fuelPurchases.route'
import auth from './auth.route'

const router = new Router()

router.get('/', (req, res) =>
	res.json()
)

router.use('/fuelPurchases', fuelPurchases)
router.use('/auth', auth)

export default router
