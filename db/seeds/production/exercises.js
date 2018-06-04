const Baby = require('babyparse')
const myFile = process.env.PWD + "/db/data/dev/exercises.csv"
const Exercise = require('../../../models/exercise')

const ExerciseCategories = {"Abs": 1,
                            "Abductors": 2,
                            "Adductors": 3,
                            "Quadriceps": 4,
                            "Lower Back": 5,
                            "Biceps": 6,
                            "Shoulders": 7,
                            "Triceps": 8,
                            "Lats": 9,
                            "Chest": 10,
                            "Hamstrings": 11,
                            "Calves": 12,
                            "Forearms": 13,
                            "Middle Back": 14,
                            "Traps": 15,
                            "Neck": 16,
                            "Glutes": 17
                          }


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex.raw('TRUNCATE exercises RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      let parsed = Baby.parseFiles(myFile)
      var exercises = parsed.data.map((row) => {
        let categoryId = ExerciseCategories[row[1]]
        return {'name': row[0], 'category_id': categoryId}
      })
      exercises.pop()

      return knex('exercises').insert(exercises);
    });
};
