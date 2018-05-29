const Baby = require('babyparse')
const myFile = process.env.PWD + "/db/data/exercises.csv"
const Exercise = require('../../../models/exercise')

var exercises = new Array()

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  var exercises = new Array()

  parsed = Baby.parseFiles(myFile)
  console.log(parsed)
  parsed.data.forEach((row) => {
    exercises.push(new Exercise(row[0]))
  })



  return knex.raw('TRUNCATE exercises RESTART IDENTITY')
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert(exercises);
    });
};
