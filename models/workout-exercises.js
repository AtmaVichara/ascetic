const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class WorkoutExercise {

  static create(attributes) {
    return database("workout_exercises")
      .insert(attributes)
      .returning("*")
  }

}

module.exports = WorkoutExercise
