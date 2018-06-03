var express = require('express');
var router = express.Router();
const DashbaordController = require('../controllers/dashboard-controller')

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    return DashbaordController.index(req, res, next)
  } else {
    next()
  }
}

router.get('/', sessionChecker, (req, res, next) => {
  res.status(302).render('index', { title: 'Express' })
})


module.exports = router
