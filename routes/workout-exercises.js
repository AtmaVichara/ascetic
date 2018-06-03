var express = require('express');
var router = express.Router();
const WorkoutExercisesController = require('../controllers/workout-exercises-controller')

router.patch("/:workout_id/exercises/:exercise_id", (req, res, next) => {
  return WorkoutExercisesController.update(req, res, next)
})

module.exports = router
