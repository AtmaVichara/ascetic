var express = require('express');
var router = express.Router();
const WorkoutsController = require('../controllers/workouts-controller')

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next()
  } else {
    res.render("index", {title: "Express"})
  }
}

router.get("/new_workouts", (req, res, next) => {
  return WorkoutsController.new(req, res, next)
})

router.post("/workouts", (req, res, next) => {
  return WorkoutsController.create(req, res, next)
})

module.exports = router
