// backend/src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

// 게임 생성
router.post('/', GameController.createGame);

// 게임 상태 조회
router.get('/:gameId/status', GameController.getGameStatus);

// 게임 참여
router.post('/:gameId/join', GameController.joinGame);

// 게임 나가기
router.post('/:gameId/leave', GameController.leaveGame);

// 게임 정보 조회
router.get('/:gameId/info', GameController.getGameInfo);

module.exports = router;
