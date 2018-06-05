const environment      = process.env.NODE_ENV || 'development';
const configuration    = require('../knexfile')[environment];
const database         = require('knex')(configuration);
const chai             = require('chai');
const expect           = chai.expect;
const ExerciseCategory = require('../../models/exercise-category')

describe("Exercise Category Model Tests", () => {

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

  describe("#allWithExercises", () => {
    it("should return category with exercises", async () => {
      let exerciseCategories = await ExerciseCategory.allWithExercises()
      expect(exerciseCategories).to.be.lengthOf(17)
    })
  })

})
