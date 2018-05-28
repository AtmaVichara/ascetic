var express = require('express');
var router = express.Router();

class DashboardController {

  static index(req, res, next) {
    res.render('dashboard')
  }

}
