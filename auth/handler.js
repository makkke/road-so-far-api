import fs from 'fs'
import { join } from 'path'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {
    principalId,
  }
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [],
    }
    const statementOne = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}

const auth = event => (
  new Promise((resolve, reject) => {
    if (!event.authorizationToken) {
      reject(new Error('Unauthorized'))
      return
    }

    const token = event.authorizationToken.substring(7) // remove "bearer " from token
    const certificate = fs.readFileSync(join('public.pem'))
    const options = {
      audience: process.env.AUTH0_CLIENT_ID,
      algorithm: 'RS256',
    }

    jwt.verify(token, certificate, options, (err, decoded) => {
      if (err) {
        reject(new Error('Unauthorized'))
        return
      }
      resolve(generatePolicy(decoded.sub, 'Allow', event.methodArn))
    })
  })
)

export const handler = (event, context, callback) => {
  auth(event)
    .then(response => callback(null, response))
    .catch(error => callback(error))
}

export default {}
