const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class ExerciseCategory {

  static allWithExercises() {
    return database.raw(`SELECT exercise_categories.*, (
        SELECT json_agg(name)
        FROM exercises
        WHERE exercises.category_id = exercise_categories.id
      ) AS exercises
      FROM exercise_categories
      INNER JOIN exercises ON exercise_categories.id = exercises.category_id
      GROUP BY exercise_categories.id
      ORDER BY exercise_categories.id
    `)
    .then((exerciseCategory) => {
      return exerciseCategory.rows
    })
    .catch((error) => console.error({error}))
  }

  static find(id) {
    return database("exercise_categories")
      .where("id", id)
      .then((exerciseCategory) => {
        return exerciseCategory[0]
      })
      .catch((error) => console.error({error}))
  }

}

module.exports = ExerciseCategory
