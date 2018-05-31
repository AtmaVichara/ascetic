const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class WorkoutExercise {

  static create(attributes) {
    return database("workout_exercises")
      .insert(attributes)
      .returning("*")
  }

  static async createAll(exercises, workout) {
    let workoutExercises = exercises.map(async (exercise) => {
      let attributes = {workout_id: workout.id, exercise_id: exercise.id}
      return await this.create(attributes)
    })
    return await Promise.all(workoutExercises)
  }

}

module.exports = WorkoutExercise
