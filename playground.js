import jwt from 'jsonwebtoken'

const AUTH0_CLIENT_ID = 'vwqeSmdGge6jdXzDwTnTQE3K7KOS3n0H'
const AUTH0_CLIENT_SECRET = '-Ga1qtbR2hp9FWiHdF7mL8xRKvrja612xJszxN1utBOy64pDhAs8zpa1X3z17gFL'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21ha2trZS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTg5NDQ0YmUwYjZiOTQ2OGQ1MzdkMjI0IiwiYXVkIjoidndxZVNtZEdnZTZqZFh6RHdUblRRRTNLN0tPUzNuMEgiLCJleHAiOjE0ODYyMTU1NjgsImlhdCI6MTQ4NjE3OTU2OH0.X9x7YzFEx-mx0YOQ4xjk1k9mzsC1cxurAfqbKPNQJtE'
const options = { audience: AUTH0_CLIENT_ID }

jwt.verify(token, AUTH0_CLIENT_SECRET, options, (err) => {
  if (err) {
    console.error(new Error('Unauthorized'))
    return
  }
  console.log('DAAAAAAAAAAA')
})
