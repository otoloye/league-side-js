const express = require('express');
const LeagueController = require('../controller/leagues');

const { addLeague, findLeague } = LeagueController;

const router = express.Router();

router
  .route('/')
  .post(addLeague)
  .get(findLeague);

module.exports = router;
