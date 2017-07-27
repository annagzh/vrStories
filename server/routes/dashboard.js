'use strict';
const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers').Dashboard;

// router.route('/')
//   .post(DashboardController.serveDashboard);

router.route('/mostactiveuser')
  .post(DashboardController.getMostActiveUser);

module.exports = router;
