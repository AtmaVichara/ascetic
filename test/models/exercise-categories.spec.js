const environment      = process.env.NODE_ENV || 'development';
const configuration    = require('../knexfile')[environment];
const database         = require('knex')(configuration);
const chai             = require('chai');
const expect           = chai.expect;
const chaiHttp         = require('chai-http');
const server           = require('../app.js');
const ExerciseCategory = require('../models/exercise-category')

describe("Exercise Category", () => {

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

  describe("#findByName", () => {
    it("should find and return exercise category by name", async () => {
      let exerciseCategory = await ExerciseCategory.findByName("Abs")
      expect(exerciseCategory).to.be.an("object")
      expect(exerciseCategory.name).to.eq("Abs")
    })
  })

})
