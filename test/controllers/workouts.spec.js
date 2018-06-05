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


  describe("GET /workouts", () => {
    it("should return all workouts", () => {
      return authenticatedUser
        .get("/workouts")
        .then((response) => {
          response.should.have.status(200)
          response.text.should.match(/id="ex-1-w-1-reps"/)
          response.text.should.match(/id="ab roller"/)
        })
    })
  })

  describe("DELETE /workouts/:id", () => {
    return authenticatedUser
      .delete("/workouts/1")
      .then((response) => {
        response.should.have.status(200)
        response.body.success.should.eq('Successfully Delete Workout')
      })
      .catch((error) => console.error({error}))
  })

})
