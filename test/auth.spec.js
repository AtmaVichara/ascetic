const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');


describe('Authentication Functionality', () => {

  const userCredentials = {
    email: 'jmrjobes@yahmail.biznis',
    username: 'joe',
    password: 'password'
  }

  var authenticatedUser = request.agent(app);

  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  beforeEach((done) => {
    database.seed.run()
    authenticatedUser
      .post('/login')
      .send(userCredentials)
      .end((err, response) => {
        expect(response.statusCode).to.equal(302)
        expect('Location', '/dashboard')
        done();
      })
  })

  describe("GET /dashboard", () => {
    it('should return 200 for authenticated user', (done) => {
      authenticatedUser.get('/dashboard')
      .expect(200, done);
    })

    it('should return 302 for unauthenticated user', (done) => {
      request(app).get('/dashboard')
        .expect(302, done)
    })
  })


})
