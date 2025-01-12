const express = require('express');
const router = express.Router();
const FactoryController = require('../controllers/FactoryController');

// 공장 생성
router.post('/:gameId', FactoryController.createFactory);

// 공장 정보 조회
router.get('/:gameId', FactoryController.getFactories);

// 공장 업그레이드
router.put('/:gameId/:factoryId', FactoryController.upgradeFactory);

// 공장 철거
router.delete('/:gameId/:factoryId', FactoryController.deleteFactory);

module.exports = router;