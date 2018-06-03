const chai = require('chai');
const expect = chai.expect;
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const request = require('supertest');

chai.use(chaiHttp);

describe('`Authentication Functionality`', () => {

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

  describe("GET /exercises", () => {
    it("should return all exercises", () => {
      return chai.request(app)
        .get("/exercises")
        .then((response) => {
          response.should.have.status(200)
          response.text.includes("ab crunch machine")
          response.text.includes("alternating renegade row")
        })
    })
  })

})
