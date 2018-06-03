var express = require('express');
var router = express.Router();
const WorkoutExercise = require("../models/workout-exercises")

class WorkoutExercisesController {

  static async update(req, res, next) {
    let workoutId = req.params.workout_id
    let exerciseId = req.params.exercise_id
    let attributes = req.body
    let workoutExercise = await WorkoutExercise.findByWorkoutAndExerciseId(workoutId, exerciseId)
    let updatedWorkEx   = await WorkoutExercise.update(attributes, workoutExercise.id)
    if (updatedWorkEx === undefined) {
      res.json({error: "Did Not Save Sets and Reps"})
    } else {
      res.json({success: "Successfully Updated Sets and Reps"})
    }
  }

}

module.exports = WorkoutExercisesController
