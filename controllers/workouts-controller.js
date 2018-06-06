var express = require('express');
var router = express.Router();
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')
const ExerciseCategory = require('../models/exercise-category')
const WorkoutExercise = require("../models/workout-exercises")


class WorkoutsController {

  static async index(req, res, next) {
    try {
      let userId = req.session.user.id
      let userWorkouts = await Workout.allUserWorkouts(userId)
      res.render("workouts/index", {workouts: userWorkouts})
    } catch (error) {
      res.sendStatus(500)
    }
  }

  static async new(req, res, next) {
    try {
      let allCategories = await ExerciseCategory.allWithExercises()
      res.render('workouts/new', {categories: allCategories})
    } catch (error) {
      res.sendStatus(500)
    }
  }

  static async create(req, res, next) {
    let workoutName         = req.body.name
    let userId              = req.session.user.id
    let exerciseNames       = req.body.exercise_names
    let workout             = await Workout.create(workoutName, userId)
    let allExercises        = await Exercise.mapExercises(exerciseNames)
    let allWorkoutExercises = await WorkoutExercise.createAll(allExercises, workout)

    if (allWorkoutExercises.includes(undefined)) {
      res.redirect("/workouts/new")
    } else {
      res.redirect("/workouts")
    }
  }

  static async destroy(req, res, next) {
    let message = await Workout.delete(req.params.id)
    if (message === "Successfully Delete Workout") {
      res.json({'success': message})
    } else {
      res.json({'error': message})
    }
  }

}

module.exports = WorkoutsController
