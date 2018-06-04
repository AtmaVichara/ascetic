const Baby = require('babyparse')
const myFile = process.env.PWD + "/db/data/dev/exercise-categories.csv"
const ExerciseCategory = require("../../../models/exercise-category")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE exercise_categories RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      let parsed = Baby.parseFiles(myFile)
      var exerciseCategories = parsed.data.map(row => new ExerciseCategory(row[0]))

      return knex('exercise_categories').insert(exerciseCategories);
    });
};
