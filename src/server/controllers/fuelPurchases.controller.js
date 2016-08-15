import httpStatus from 'http-status'
import FuelPurchase from '../models/fuelPurchase.model'

function index(req, res, next) {
  FuelPurchase
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .execAsync()
    .then(fuelPurchases => res.json(fuelPurchases))
    .error(e => next(e))
}

function show(req, res) {
  return res.json(req.fuelPurchase)
}

function create(req, res, next) {
  const fuelPurchase = new FuelPurchase({
    ...req.body,
    user: req.user.id,
  })

  fuelPurchase.saveAsync()
    .then(savedFuelPurchase => res.status(httpStatus.CREATED).json(savedFuelPurchase))
    .error(e => next(e))
}

function update(req, res, next) {
  const fuelPurchase = req.fuelPurchase
  fuelPurchase.region = req.body.region
  fuelPurchase.volume = req.body.volume
  fuelPurchase.total = req.body.total
  fuelPurchase.createdAt = req.body.createdAt

  fuelPurchase.saveAsync()
    .then(savedFuelPurchase => res.json(savedFuelPurchase))
    .error(e => next(e))
}

function remove(req, res, next) {
  const fuelPurchase = req.fuelPurchase
  fuelPurchase.removeAsync()
    .then(() => res.json({}))
    .error(e => next(e))
}

function load(req, res, next, id) {
  FuelPurchase.get(id)
    .then(fuelPurchase => {
      req.fuelPurchase = fuelPurchase // eslint-disable-line no-param-reassign
      return next()
    })
    .error(e => next(e))
}

export default { index, create, show, update, remove, load }
