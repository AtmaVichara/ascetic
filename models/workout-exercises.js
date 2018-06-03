const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class WorkoutExercise {

  static create(attributes) {
    return database("workout_exercises")
      .insert(attributes)
      .returning("*")
      .catch((error) => console.error({error}))
  }

  static findByWorkoutAndExerciseId(workoutId, exerciseId) {
    return database("workout_exercises")
      .select("*")
      .where({
        workout_id: workoutId,
        exercise_id: exerciseId
      })
      .then((workoutExercise) => {
        return workoutExercise[0]
      })
      .catch((error) => console.error({error}))
  }

  static async createAll(exercises, workout) {
    let workoutExercises = exercises.map(async (exercise) => {
      let attributes = {workout_id: workout.id, exercise_id: exercise.id}
      return await this.create(attributes)
    })
    return await Promise.all(workoutExercises)
  }

  static findAllByWorkoutId(workoutId) {
    return database.raw(`
      SELECT reps, sets, exercises.name AS exercise
      FROM workout_exercises
      INNER JOIN exercises ON workout_exercises.exercise_id = exercises.id
      WHERE workout_exercises.workout_id = ?
      GROUP BY workout_exercises.id
      `, workoutId)
      .then((workoutExercises) => {
        return workoutExercises.rows
      })
      .catch((error) => console.error({error}))
  }

  static updateSetsReps(attributes, workoutExerciseId) {
    return database("workout_exercises")
      .where("id", workoutExerciseId)
      .update(attributes)
      .returning("*")
      .then((workoutExercise) => {
        return workoutExercise[0]
      })
      .catch((error) => console.error({error}))
  }

}

module.exports = WorkoutExercise
