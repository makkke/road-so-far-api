import jwt from 'jsonwebtoken'

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

export default event => (
  new Promise((resolve, reject) => {
    if (!event.authorizationToken) {
      reject(new Error('Unauthorized'))
      return
    }

    const token = event.authorizationToken.substring(7) // remove "bearer " from token
    const options = { audience: process.env.AUTH0_CLIENT_ID }
    jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, options, (err, decoded) => {
      if (err) {
        reject(new Error('Unauthorized'))
        return
      }
      resolve(generatePolicy(decoded.sub, 'Allow', event.methodArn))
    })
  })
)
