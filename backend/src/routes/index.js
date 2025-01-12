const express = require('express');
const router = express.Router();

// 게임 관련 라우터 연결
const gameRoutes = require('./gameRoutes');
router.use('/games', gameRoutes);

// 사용자 관련 라우터 연결
const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

// 공장 관련 라우터 연결
const factoryRoutes = require('./factoryRoutes');
router.use('/factories', factoryRoutes);

// 정수 시설 관련 라우터 연결
const purificationRoutes = require('./purificationRoutes');
router.use('/purification-facilities', purificationRoutes);

// 거래 관련 라우터 연결
const tradeRoutes = require('./tradeRoutes');
router.use('/trades', tradeRoutes);

// 리더보드 관련 라우터 연결
const leaderboardRoutes = require('./leaderboardRoutes');
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;
