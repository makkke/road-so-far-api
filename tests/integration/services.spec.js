import { expect } from 'chai'
import supertest from 'supertest'
import faker from 'faker'

import app from '../../src'
import { connect, drop, createTheme, createService, createServices } from './utils'

const request = supertest(app)

describe('Services', () => {
  beforeEach(done => connect(() => done()))
  afterEach(done => drop(done))

  describe('POST /services', () => {
    it('should be able to create a service', async (done) => {
      const theme = await createTheme()
      const data = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        icon: 'cos-parks-recreation',
        theme: theme._id,
        isLegacy: true,
      }

      request
        .post('/services')
        .send(data)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(data.name)
          expect(res.body.description).to.equal(data.description)
          expect(res.body.icon).to.equal(data.icon)
          expect(res.body.theme).to.equal(data.theme.toString())
          expect(res.body.isLegacy).to.equal(data.isLegacy)

          done()
        })
    })

    it('service should be not published by default', async (done) => {
      const theme = await createTheme()
      const data = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        icon: 'cos-parks-recreation',
        theme: theme._id,
        isLegacy: true,
      }

      request
        .post('/services')
        .send(data)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isPublished).to.equal(false)

          done()
        })
    })
  })

  describe('GET /services', () => {
    it('should be able to list services', async (done) => {
      const services = await createServices(3)

      request
        .get('/services')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body).to.be.an.instanceof(Array)
          expect(res.body.length).to.equal(services.length)
          done()
        })
    })
  })

  describe('GET /services/:id', () => {
    it('should be able to view service details', async (done) => {
      const service = await createService()

      request
        .get(`/services/${service._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(service.name)
          expect(res.body.description).to.equal(service.description)
          expect(res.body.icon).to.equal(service.icon)
          expect(res.body.isLegacy).to.equal(service.isLegacy)
          done()
        })
    })

    it('service should contain expanded theme details', async (done) => {
      const service = await createService()

      request
        .get(`/services/${service._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.theme).to.have.property('name')
          expect(res.body.theme).to.have.property('color')
          done()
        })
    })
  })

  describe('POST /services/:id/publish', () => {
    it('should be able to publish a legacy service', async (done) => {
      const service = await createService({
        url: 'http://mordor.com',
      })

      request
        .post(`/services/${service._id}/publish`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isPublished).to.equal(true)
          done()
        })
    })

    it('should not be able to publish a legacy service without url', async (done) => {
      const service = await createService()

      request
        .post(`/services/${service._id}/publish`)
        .set('Accept', 'application/json')
        .expect(409, done)
    })

    it('should be able to publish a new service', async (done) => {
      const service = await createService({
        isLegacy: false,
        route: '/new-service',
        steps: [
          { name: 'Confirmation', route: 'confirmation' },
          { name: 'Payment', route: 'payment' },
        ],
      })

      request
        .post(`/services/${service._id}/publish`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isPublished).to.equal(true)
          done()
        })
    })

    it('should not be able to publish a new service without route', async (done) => {
      const service = await createService({
        isLegacy: false,
        steps: [
          { name: 'Confirmation', route: 'confirmation' },
          { name: 'Payment', route: 'payment' },
        ],
      })

      request
        .post(`/services/${service._id}/publish`)
        .set('Accept', 'application/json')
        .expect(409, done)
    })

    it('should not be able to publish a new service without steps', async (done) => {
      const service = await createService({
        isLegacy: false,
        route: '/new-service',
      })

      request
        .post(`/services/${service._id}/publish`)
        .set('Accept', 'application/json')
        .expect(409, done)
    })
  })

  describe('POST /services/:id/unpublish', () => {
    it('should be able to unpublish a legacy service', async (done) => {
      const service = await createService({
        url: 'http://mordor.com',
        isPublished: true,
      })

      request
        .post(`/services/${service._id}/unpublish`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isPublished).to.equal(false)
          done()
        })
    })

    it('should be able to unpublish a new service', async (done) => {
      const service = await createService({
        isLegacy: false,
        route: '/new-service',
        steps: [
          { name: 'Confirmation', route: 'confirmation' },
          { name: 'Payment', route: 'payment' },
        ],
        isPublished: true,
      })

      request
        .post(`/services/${service._id}/unpublish`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isPublished).to.equal(false)
          done()
        })
    })
  })

  describe('PUT /services/:id', () => {
    it('should be able to update service details', async (done) => {
      const service = await createService()
      const theme = await createTheme()
      const data = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        icon: 'cos-parks-recreation-new',
        theme: theme._id,
        isLegacy: true,
        url: faker.internet.url(),
        route: faker.internet.url(),
      }

      request
        .put(`/services/${service._id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(data.name)
          expect(res.body.description).to.equal(data.description)
          expect(res.body.icon).to.equal(data.icon)
          expect(res.body.theme).to.equal(data.theme.toString())
          expect(res.body.isLegacy).to.equal(data.isLegacy)
          expect(res.body.url).to.equal(data.url)
          expect(res.body.route).to.equal(data.route)
          done()
        })
    })

    it('should be able to update steps', async (done) => {
      const service = await createService()
      const data = {
        ...service._doc,
        steps: [
          { name: 'Confirmation', route: 'confirmation' },
          { name: 'Payment', route: 'payment' },
          { name: 'Receipt', route: 'receipt' },
        ],
      }

      request
        .put(`/services/${service._id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.steps.length).to.equal(data.steps.length)
          done()
        })
    })

    it('should unpublish service if changed from legacy to new', async (done) => {
      const service = await createService({
        isLegacy: true,
        url: faker.internet.url(),
        isPublished: true,
      })
      const data = {
        ...service._doc,
        isLegacy: false,
      }

      request
        .put(`/services/${service._id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isLegacy).to.equal(data.isLegacy)
          expect(res.body.isPublished).to.equal(false)
          done()
        })
    })

    it('should unpublish service if changed from new to legacy', async (done) => {
      const service = await createService({
        isLegacy: false,
        isPublished: true,
      })
      const data = {
        ...service._doc,
        isLegacy: true,
      }

      request
        .put(`/services/${service._id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.isLegacy).to.equal(data.isLegacy)
          expect(res.body.isPublished).to.equal(false)
          done()
        })
    })
  })

  describe('DELETE /services/:id', () => {
    it('should be able to remove a service', async (done) => {
      const service = await createService()

      request
        .delete(`/services/${service._id}`)
        .set('Accept', 'application/json')
        .expect(204, done)
    })
  })
})
