// backend/src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

// 게임 생성
router.post('/', GameController.createGame);  // 최종 경로: /api/games

// 게임 참여
router.post('/:gameId/players', GameController.joinGame);  // 최종 경로: /api/games/:gameId/players

// 게임 나가기
router.delete('/:gameId/players/:playerId', GameController.leaveGame);  // 최종 경로: /api/games/:gameId/players/:playerId

// 게임 정보 조회
router.get('/:gameId', GameController.getGameInfo);  // 최종 경로: /api/games/:gameId

// 게임 상태 조회
router.get('/:gameId/status', GameController.getGameStatus);  // 최종 경로: /api/games/:gameId/status

module.exports = router;
