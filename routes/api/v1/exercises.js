var express = require('express');
var router = express.Router();
var ExercisesController = require("../../../controllers/api/v1/exercises-controller")

router.get('/', (req, res, next) => {
  return ExercisesController.index(req, res, next)
})

router.get('/:id', (req, res, next) => {
  return ExercisesController.show(req, res, next)
})

module.exports = router
