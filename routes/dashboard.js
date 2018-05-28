var express = require('express');
var router = express.Router();
var dashbaordController = require('../controllers/dashboard-controller')

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard')
  } else {
    next()
  }
}

router.get('/', sessionChecker, (req, res, next) => {
  res.status(302).render('index', { title: 'Express' })
})


module.exports = router
