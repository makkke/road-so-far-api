import { FuelPurchase } from '../connectors/dynamodb'
import { quantityToLiters } from '../utils/convert'

export const queryFuelPurchases = userId => (
  new Promise((resolve, reject) => {
    FuelPurchase
      .scan()
      .where('userId').equals(userId)
      .loadAll()
      .exec((err, result) => {
        if (err) {
          reject(err)
          return
        }

        resolve(result.Items.map(x => x.attrs))
      })
  })
)

export const findFuelPurchaseById = id => (
  new Promise((resolve, reject) => {
    FuelPurchase
      .get(id, (err, fuelPurchase) => {
        if (err) {
          reject(err)
          return
        }

        resolve(fuelPurchase ? fuelPurchase.attrs : null)
      })
  })
)

export const createFuelPurchase = (input, userId) => (
  new Promise((resolve, reject) => {
    const quantity = quantityToLiters(input.quantity)
    const savedFuelPurchase = new FuelPurchase({ userId, quantity })
    savedFuelPurchase.save((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(savedFuelPurchase.attrs)
    })
  })
)

export default {}
