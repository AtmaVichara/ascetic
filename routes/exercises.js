var express = require('express');
var router = express.Router();
const ExercisesController = require('../controllers/exercises-controller')

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next()
  } else {
    res.render("index", {title: "Express"})
  }
}

router.get('/', sessionChecker, (req, res, next) => {
  return ExercisesController.index(req, res, next);
})

module.exports = router
