var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users-controller')


router.post('/signup', function(req, res, next) {
  return UsersController.signUp(req, res, next)
});

router.post('/login', (req, res, next) => {
  return UsersController.logIn(req, res, next)
})

module.exports = router;
