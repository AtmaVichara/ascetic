var express = require('express');
var router = express.Router();
const ExercisesController = require('../controllers/exercises-controller')

router.get('/', (req, res, next) => {
  return ExercisesController.index(req, res, next);
})

module.exports = router
