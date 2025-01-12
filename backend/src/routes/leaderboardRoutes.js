const express = require('express');
const router = express.Router();
const LeaderboardController = require('../controllers/LeaderboardController');

router.get('/', LeaderboardController.getLeaderboard); // 리더보드 조회

module.exports = router;
