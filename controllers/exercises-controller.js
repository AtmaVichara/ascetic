var express = require('express');
var router = express.Router();
const Exercise = require('../models/exercise')

class ExercisesController {

  static index(req, res, next) {
    return Exercise.all(req, res, next)
      .then((allExercises) => {
        res.render('exercises/index', {exercises: allExercises})
      });
  }
}

module.exports = ExercisesController
