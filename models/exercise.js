const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);


class Exercise {

  constructor(name) {
    this.name = name
  }

}

module.exports = Exercise
