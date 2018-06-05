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

router.get("/new", (req, res, next) => {
  return WorkoutsController.new(req, res, next)
})

router.get("/", sessionChecker, (req, res, next) => {
  return WorkoutsController.index(req, res, next)
})

router.post("/", (req, res, next) => {
  return WorkoutsController.create(req, res, next)
})

router.delete("/:id", (req, res, next) => {
  return WorkoutsController.destroy(req, res, next)
})

module.exports = router
