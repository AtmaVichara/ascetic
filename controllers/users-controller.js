var express = require('express');
var router = express.Router();
const User = require('../models/user')

class UsersController {

  static signUp(req, res, next) {
    return User.signUp(req, res, next)
  }

  static logIn(req, res, next) {
    return User.logIn(req, res, next)
  }

}

module.exports = UsersController
