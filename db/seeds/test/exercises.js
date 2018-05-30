const Baby = require('babyparse')
const myFile = process.env.PWD + "/db/data/test/exercises.csv"
const Exercise = require('../../../models/exercise')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  var exercises = new Array()

  let parsed = Baby.parseFiles(myFile)

  parsed.data.forEach((row) => {
    exercises.push(new Exercise(row[0]))
  })



  return knex.raw('TRUNCATE exercises RESTART IDENTITY')
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert(exercises);
    });
};
