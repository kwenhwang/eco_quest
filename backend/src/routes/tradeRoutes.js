const express = require('express');
const router = express.Router();
const TradeController = require('../controllers/TradeController');

router.post('/:gameId/trades', TradeController.createTrade); // 거래 생성
router.get('/:gameId/trades', TradeController.getTrades);   // 거래 조회

module.exports = router;
