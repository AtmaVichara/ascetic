const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class Workout {

  static allUserWorkouts(userId) {
    return database.raw(`
      SELECT workouts.*,(
        SELECT json_agg(
          json_build_object(
            'id', exercises.id,
            'name', name,
            'sets', workout_exercises.sets,
            'reps', workout_exercises.reps))
        FROM exercises
        INNER JOIN workout_exercises ON exercises.id = workout_exercises.exercise_id
        WHERE workout_exercises.workout_id = workouts.id
      ) AS exercises
      FROM workouts
      INNER JOIN workout_exercises ON workouts.id = workout_exercises.workout_id
      WHERE workouts.user_id = ?
      GROUP BY workouts.id
      ORDER BY workouts.id
    `, userId)
    .then((workouts) => {
      return workouts.rows
    })
    .catch((error) => console.error({error}))
  }

  static findLastByUserId(userId) {
    return database("workouts")
      .select("*")
      .where("user_id", userId)
      .orderBy("id", "asc")
      .then((workout) => {
        return workout[0]
      })
      .catch((error) => console.error({error}))
  }

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