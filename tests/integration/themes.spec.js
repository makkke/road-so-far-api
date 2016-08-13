import { expect } from 'chai'
import supertest from 'supertest'
import faker from 'faker'

import app from '../../src'
import { connect, drop, createTheme, createThemes } from './utils'

const request = supertest(app)

describe('Themes', () => {
  beforeEach(done => connect(() => done()))
  afterEach(done => drop(done))

  describe('POST /themes', () => {
    it('should be able to create a theme', (done) => {
      const data = {
        name: faker.commerce.department(),
        color: faker.internet.color(),
      }

      request
        .post('/themes')
        .send(data)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(data.name)
          expect(res.body.color).to.equal(data.color)

          done()
        })
    })
  })

  describe('GET /themes', async () => {
    const themes = await createThemes(3)

    it('should be able to list themes', (done) => {
      request
        .get('/themes')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body).to.be.an.instanceof(Array)
          expect(res.body.length).to.equal(themes.length)
          done()
        })
    })
  })

  describe('GET /themes/:id', () => {
    it('should be able to view theme details', async (done) => {
      const theme = await createTheme()

      request
        .get(`/themes/${theme._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(theme.name)
          expect(res.body.color).to.equal(theme.color)
          done()
        })
    })
  })

  describe('PUT /themes/:id', () => {
    it('should be able to update theme details', async (done) => {
      const theme = await createTheme()
      const data = {
        name: faker.commerce.department(),
        color: faker.internet.color(),
      }

      request
        .put(`/themes/${theme._id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.name).to.equal(data.name)
          expect(res.body.color).to.equal(data.color)
          done()
        })
    })
  })

  describe('DELETE /themes/:id', () => {
    it('should be able to remove a theme', async (done) => {
      const theme = await createTheme()

      request
        .delete(`/themes/${theme._id}`)
        .set('Accept', 'application/json')
        .expect(204, done)
    })
  })
})
