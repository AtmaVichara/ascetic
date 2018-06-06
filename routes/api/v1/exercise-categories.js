var express = require('express');
var router = express.Router();
var ExerciseCategoriesController = require("../../../controllers/api/v1/exercise-categories-controller")

router.get('/', (req, res, next) => {
  return ExerciseCategoriesController.index(req, res, next)
})

router.get('/:id', (req, res, next) => {
  return ExerciseCategoriesController.show(req, res, next)
})

module.exports = router
