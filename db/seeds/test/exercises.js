const Baby = require('babyparse')
const myFile = process.env.PWD + "/db/data/test/exercises.csv"
const Exercise = require('../../../models/exercise')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let parsed = Baby.parseFiles(myFile)
  var exercises = parsed.data.map(row => new Exercise(row[0]))

  return knex.raw('TRUNCATE exercises RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert(exercises);
    });
};
