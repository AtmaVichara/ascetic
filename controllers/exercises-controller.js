var express = require('express');
var router = express.Router();
const ExerciseCategory = require('../models/exercise-category')

class ExercisesController {

  static index(req, res, next) {
    return ExerciseCategory.allWithExercises()
      .then((allCategories) => {
        res.render('exercises/index', {categories: allCategories})
      });
  }
}

module.exports = ExercisesController
