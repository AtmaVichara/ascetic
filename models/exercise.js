const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);


class Exercise {

  constructor(name) {
    this.name = name
  }

  static all() {
    return database('exercises').select('*')
  }

}

module.exports = Exercise
