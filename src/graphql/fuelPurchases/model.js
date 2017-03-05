import { FuelPurchase } from '../connectors/dynamodb'

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

export const createFuelPurchase = (userId, fuelPurchase) => (
  new Promise((resolve, reject) => {
    const savedFuelPurchase = new FuelPurchase({ ...fuelPurchase, userId })
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
