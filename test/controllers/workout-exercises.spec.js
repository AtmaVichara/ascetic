const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.use(chaiHttp);

describe('Workout Exercises Routes', () => {

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
      .then(() => done())
      .catch((error) => {
        throw error;
      })
      .done()
  })

  describe("PATCH /workouts/:workout_id/exercises/:exercise_id", () => {
    it("should return successful message after updating", () => {
      return chai.request(app)
        .patch("/workouts/1/exercises/1")
        .send({
          reps: 3,
          sets: 3
        })
        .then((response) => {
          response.body.success.should.equal("Successfully Updated Sets and Reps")
        })
    })
  })

})
