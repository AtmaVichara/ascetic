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

  static create(req, res, next) {
    let workoutName = req.body.workout_name
    let userId = req.session.user.id
    let exerciseNames = req.body.exercise_names

    Workout.create(workoutName, userId)
      .then((newWorkout) => {
        return newWorkout
      })
      .then((workout) => {
        exerciseNames.forEach((name) => {
           Exercise.findAllByName(name)
            .then((exercise) => {
              let exercises = new Array()

              exercises.push(exercise)
              return exercises
            })
            .then((allExercises) => {
              allExercises.forEach((exercise) => {
                let attributes = {workout_id: workout.id, exercise_id: exercise.id}

                WorkoutExercise.create(attributes)
                  .then((workoutExercise) => {
                    return workoutExercise
                    res.redirect("/workouts")
                  })
              })
            })
        })
      })
  }

}

module.exports = WorkoutsController
