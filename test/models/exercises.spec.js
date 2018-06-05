const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);
const chai            = require('chai');
const expect          = chai.expect;
const Exercise        = require('../../models/exercise')

describe("Exercise Model Test", () => {

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

  describe("#all", () => {
    it("returns all exercises", async () => {
      let exercises = await Exercise.all()
      expect(exercises.length).to.equal(20)
      expect(exercises[0].name).to.equal('ab crunch machine')
      expect(exercises[0].id).to.equal(1)
    })
  })

  describe("#findAllByName", () => {
    it("should return exercise based on name", async () => {
      let exercise = await Exercise.findAllByName('ab crunch machine')
      expect(exercise.name).to.eq('ab crunch machine')
      expect(exercise.id).to.eq(1)
    })
  })

  describe("#mapExercises", () => {
    it("should return array of all exercises based on name", async () => {
      let exerciseNames = ['adductor', 'atlas stone trainer', 'ab roller']
      let exercises = await Exercise.mapExercises(exerciseNames)
      expect(exercises.length).to.eq(exerciseNames.length)
      expect(exercises[0]).to.be.an('object')
      expect(exercises[0].name).to.be.eq('adductor')
      expect(exercises[1].name).to.be.eq('atlas stone trainer')
      expect(exercises[2].name).to.be.eq('ab roller')
    })
  })
})
