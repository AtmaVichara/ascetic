const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);
const chai            = require('chai');
const expect          = chai.expect;
const chaiHttp        = require('chai-http');
const server          = require('../../app.js');
const Workout         = require('../../models/workout')
pry = require('pryjs')

chai.use(chaiHttp);

describe("Workout Model", () => {

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

  describe("Methods", () => {

    describe("#allUserWorkouts", () => {
      it("should return all workouts associated with user", async () => {
        let workouts = await Workout.allUserWorkouts(1)
        expect(workouts.length).to.equal(2)
        expect(workouts[0].id).to.equal(2)
      })
    })

    describe("#create", () => {
      it("should return newly created workout", async () => {
        let newWorkout = await Workout.create('some name', 1)
        expect(newWorkout.name).to.equal('some name')
        expect(newWorkout.id).to.equal(3)
      })
    })

  })

})