const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);

class ExerciseCategory {

  constructor(name) {
    this.name = name
  }

  static findByName(name) {
    return database('exercsie_categories')
      .select('*')
      .where('name', name)
      .then((exerciseCategory) => {
        return exerciseCategory[0]
      })
      .catch((error) => console.error({error}))
  }

}

module.exports = ExerciseCategory
