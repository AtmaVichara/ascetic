var express = require('express');
var router = express.Router();
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')
const WorkoutExercise = require("../models/workout-exercises")

class WorkoutsController {

  static new(req, res, next) {
    return Exercise.all()
      .then((allExercises) => {
        res.render('new-workouts', {exercises: allExercises})
      })
  }

  static async create(req, res, next) {
    let workoutName = req.body.workout_name
    let userId = req.session.user.id
    let exerciseNames = req.body.exercise_names

    let workout = await Workout.create(workoutName, userId)
    let exercises = exerciseNames.map(async (name) => {
      return await Exercise.findAllByName(name)
    })
    let allExercises = await Promise.all(exercises)
    let workoutExercises = allExercises.map(async (exercise) => {
      let attributes = {workout_id: workout.id, exercise_id: exercise.id}
      return await WorkoutExercise.create(attributes)
    })
    let allWorkoutExercises = await Promise.all(workoutExercises)
    if (allWorkoutExercises.includes(undefined)) {
      res.redirect("/new_workouts")
    } else {
      res.redirect("/workouts")
    }
  }

}

module.exports = WorkoutsController
