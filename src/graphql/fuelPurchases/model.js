// import { FuelPurchase } from '../connectors/dynamodb'
import uuid from 'uuid'
import AWS from 'aws-sdk' // eslint-disable-line import/no-extraneous-dependencies

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})

// export const queryFuelPurchases = userId => (
//   new Promise((resolve, reject) => {
//     FuelPurchase
//       .scan()
//       .where('userId').equals(userId)
//       .loadAll()
//       .exec((err, result) => {
//         if (err) {
//           reject(err)
//           return
//         }
//
//         resolve(result.Items.map(x => x.attrs))
//       })
//   })
// )

// export const findFuelPurchaseById = id => (
//   new Promise((resolve, reject) => {
//     FuelPurchase
//       .get(id, (err, fuelPurchase) => {
//         if (err) {
//           reject(err)
//           return
//         }
//
//         resolve(fuelPurchase ? fuelPurchase.attrs : null)
//       })
//   })
// )

export const findFuelPurchaseById = id => (
  new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.DYNAMODB_FUEL_PURCHASES_TABLE,
      Key: { id },
    }

    dynamodb.get(params, (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      resolve(data.Item)
    })
  })
)

// export const createFuelPurchase = (userId, fuelPurchase) => (
//   new Promise((resolve, reject) => {
//     const savedFuelPurchase = new FuelPurchase({ ...fuelPurchase, userId })
//     savedFuelPurchase.save((err) => {
//       if (err) {
//         reject(err)
//         return
//       }
//
//       resolve(savedFuelPurchase.attrs)
//     })
//   })
// )

export const createFuelPurchase = (userId, fuelPurchase) => (
  new Promise((resolve, reject) => {
    const timestamp = new Date().getTime()
    const id = uuid.v4()
    const params = {
      TableName: process.env.DYNAMODB_FUEL_PURCHASES_TABLE,
      Item: {
        id,

        userId,
        quantity: fuelPurchase.quantity, // in litres
        region: fuelPurchase.region,
        city: fuelPurchase.city,

        createdAt: timestamp,
        updatedAt: timestamp,
      },
    }

    dynamodb.put(params, async (err) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      const createdFuelPurchase = await findFuelPurchaseById(id)

      resolve(createdFuelPurchase)
    })
  })
)

export default {}
