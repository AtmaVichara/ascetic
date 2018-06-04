const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const request = require('supertest');

chai.use(chaiHttp)

describe("Dashbaord Controller Test", () => {

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
    it("shows the dashbaord path and return 200 code", () => {
      return authenticatedUser
        .get("/dashboard")
        .then((response) => {
          response.should.have.status(200)
          response.text.should.match(/id="userWorkouts"/)
        })
    })

    it("returns index page for unauthenticated user", () => {
      return chai.request(app)
        .get("/dashboard")
        .then((response) => {
          response.should.have.status(200)
          response.text.should.match(/id="logInForm"/)
          response.text.should.match(/id="signUpForm"/)
        })
    })
  })

})
