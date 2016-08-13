import Promise from 'bluebird'
import mongoose from 'mongoose'
import config from './config/config'
import app from './config/express'

// promisify mongoose
Promise.promisifyAll(mongoose)

// connect to mongo db
mongoose.connect(config.mongo.url, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.url}`)
})

// listen on port config.port
app.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.env})`) // eslint-disable-line
})

export default app
