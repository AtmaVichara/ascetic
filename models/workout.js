const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class Workout {

  static create(workoutName, userId) {
    return database("workouts")
      .insert({
        name: workoutName,
        user_id: userId
      })
      .returning('*')
      .then((workout) => {
        return workout[0]
      })
      .catch((error) => console.error({error}))
  }

}

module.exports = Workout
