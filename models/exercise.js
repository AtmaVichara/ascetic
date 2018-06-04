const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);


class Exercise {
  
  static all() {
    return database('exercises')
      .select('*')
  }

  static findAllByName(exerciseName) {
    return database('exercises')
      .select('*')
      .where("name", exerciseName)
      .returning("*")
      .then((exercise) => {
        return exercise[0]
      })
      .catch((error) => console.error({error}))
  }

  static async mapExercises(exerciseNames) {
    let exercises = exerciseNames.map(async (name) => {
      return await this.findAllByName(name)
    })
    return await Promise.all(exercises)
  }

}

module.exports = Exercise
