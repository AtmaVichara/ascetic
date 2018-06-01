var express = require('express');
var router = express.Router();
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')
const WorkoutExercise = require("../models/workout-exercises")
pry = require('pryjs')


class WorkoutsController {

  static async index(req, res, next) {
    try {
      let userId = req.session.user.id
      let userWorkouts = await Workout.allUserWorkouts(userId)
      res.render("workouts", {workouts: userWorkouts})
    } catch (error) {
      console.error({error})
    }
  }

  static async new(req, res, next) {
    try {
      let allExercises = await Exercise.all()
      res.render('new-workouts', {exercises: allExercises})
    } catch (error) {
      console.error({error})
    }
  }

  static async create(req, res, next) {
    let workoutName = req.body.workout_name
    let userId = req.session.user.id
    let exerciseNames = req.body.exercise_names
    let workout = await Workout.create(workoutName, userId)
    let allExercises = await Exercise.mapExercises(exerciseNames)
    let allWorkoutExercises = await WorkoutExercise.createAll(allExercises, workout)
    if (allWorkoutExercises.includes(undefined)) {
      res.redirect("/new_workouts")
    } else {
      res.redirect("/workouts")
    }
  }

}

module.exports = WorkoutsController
