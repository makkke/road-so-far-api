import uuid from 'uuid'
import { doc } from 'serverless-dynamodb-client'

export const queryFuelPurchases = userId => (
  new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.DYNAMODB_FUEL_PURCHASES_TABLE,
      IndexName: 'CreatedAtIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ScanIndexForward: false,
    }

    doc.query(params, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data.Items)
    })
  })
)

export const findFuelPurchaseById = id => (
  new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.DYNAMODB_FUEL_PURCHASES_TABLE,
      Key: { id },
    }

    doc.get(params, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data.Item)
    })
  })
)

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

    doc.put(params, async (err) => {
      if (err) {
        reject(err)
        return
      }

      const createdFuelPurchase = await findFuelPurchaseById(id)

      resolve(createdFuelPurchase)
    })
  })
)

export default {}
