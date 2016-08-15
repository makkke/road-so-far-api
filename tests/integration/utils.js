import mongoose from 'mongoose'
import faker from 'faker'

import Theme from '../../src/server/models/theme'
import Service from '../../src/server/models/service'

export function connect(done) {
  if (mongoose.connection.name !== 'zephyr-test') {
    return done()
  }

  mongoose.connect((process.env.MONGO_URL), (err) => {
    if (err) return done(err)
    done()
  })
}

export function drop(done) {
  if (mongoose.connection.name !== 'zephyr-test') {
    return done()
  }

  mongoose.connection.db.dropDatabase((err) => {
    if (err) return done(err)
    mongoose.connection.close(done)
  })
}

export async function createTheme(data = {}) {
  const theme = new Theme({
    name: faker.commerce.department(),
    color: faker.internet.color(),
    ...data,
  })

  return theme.saveAsync()
}

export async function createThemes(n) {
  const promises = []
  for (let i = 0; i < n; i++) {
    promises.push(createTheme())
  }

  return Promise.all(promises)
}

export async function createService(data = {}) {
  const theme = await createTheme()

  const service = new Service({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    icon: 'cos-parks-recreation',
    theme: theme._id,
    isLegacy: true,
    ...data,
  })

  return service.saveAsync()
}

export async function createServices(n) {
  const promises = []
  for (let i = 0; i < n; i++) {
    promises.push(createService())
  }

  return Promise.all(promises)
}
