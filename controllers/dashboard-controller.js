var express = require('express');
var router = express.Router();
const Workout = require('../models/workout')

class DashboardController {

  static async index(req, res, next) {
    let userId       = req.session.user.id
    let userWorkouts = await Workout.allUserWorkouts(userId)

    res.render('dashboard', {workouts: userWorkouts})
  }

}

module.exports = DashboardController
