'use strict';
const express = require('express');
const router = express.Router();
const StoryController = require('../controllers').Stories;

router.route('/:id')
  .get(StoryController.getAll);

router.route('/:id/addstory')
  .get(StoryController.addStory);

router.route('/:id/getlatest')
  .get(StoryController.getLatestStory);

router.route('/:id/getlatestimage')
  .get(StoryController.getLatestImage);

module.exports = router;
