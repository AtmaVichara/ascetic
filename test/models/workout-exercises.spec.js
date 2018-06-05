const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);
const chai            = require('chai');
const expect          = chai.expect;
const WorkoutExercise = require('../../models/workout-exercises')

describe("WorkoutExercise Model Test", () => {

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

  describe("#create", () => {
    it("should create and return new workout exercise", async () => {
      let attrs = {reps: 2, sets: 12, workout_id: 1, exercise_id: 1, weight: 0}
      let newWorkoutExercise = await WorkoutExercise.create(attrs)
      expect(newWorkoutExercise).to.be.an('object')
      expect(newWorkoutExercise.reps).to.eq(2)
      expect(newWorkoutExercise.sets).to.eq(12)
      expect(newWorkoutExercise.workout_id).to.eq('1')
      expect(newWorkoutExercise.exercise_id).to.eq('1')
      expect(newWorkoutExercise.weight).to.eq(0)
    })
  })

  describe("#findByWorkoutAndExerciseId", () => {
    it("returns workout exercise by workout id and exercise id", async () => {
      let workoutExercise = await WorkoutExercise.findByWorkoutAndExerciseId(1, 4)
      expect(workoutExercise).to.be.a('object')
      expect(workoutExercise.workout_id).to.eq('1')
      expect(workoutExercise.exercise_id).to.eq('4')
    })
  })

  describe("#createAll", () => {
    it("creates all workout exercises and returns array of them", async () => {
      let exercises = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
      let workout = {id: 1}
      let workoutExercises = await WorkoutExercise.createAll(exercises, workout)
      expect(workoutExercises).to.be.lengthOf(4)
      expect(workoutExercises[0]).to.be.an('object')
      expect(workoutExercises[1]).to.be.an('object')
      expect(workoutExercises[2]).to.be.an('object')
      expect(workoutExercises[3]).to.be.an('object')
      expect(workoutExercises[0].exercise_id).to.eq('1')
    })
  })

  describe("#update", () => {
    it("updates workout exercise and returns it", async () => {
      let attrs = {reps: 1, sets: 12, weight: 239}
      let updated = await WorkoutExercise.update(attrs, 2)
      expect(updated).to.be.an('object')
      expect(updated.reps).to.eq(1)
      expect(updated.sets).to.eq(12)
      expect(updated.weight).to.eq(239)

      let newAttrs = {reps: 3, sets: 0, weight: 100}
      let newUpdated = await WorkoutExercise.update(newAttrs, 2)
      expect(newUpdated).to.be.an('object')
      expect(newUpdated.reps).to.eq(3)
      expect(newUpdated.sets).to.eq(0)
      expect(newUpdated.weight).to.eq(100)
    })
  })
})
