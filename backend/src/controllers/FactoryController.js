///games/:gameId/factories 관련 로직 처리 (공장 건설, 업그레이드, 철거).

// backend/src/controllers/FactoryController.js

const Factory = require('../models/Factory');
const Game = require('../models/Game');
const db = require('../db');

// 공장 생성
exports.createFactory = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { factoryType, location } = req.body;

        // 데이터베이스에 공장 생성
        const [factory] = await db('factories')
            .insert({
                game_id: gameId,
                factory_type: factoryType,
                location_x: location.x,
                location_y: location.y,
                created_at: db.fn.now(),
            })
            .returning('*');

        res.status(201).json(factory);
    } catch (error) {
        console.error('공장 생성 오류:', error.message);
        res.status(500).json({ error: '공장 생성에 실패했습니다.' });
    }
};

// 공장 정보 조회
exports.getFactories = async (req, res) => {
    try {
        const { gameId } = req.params;

        // 데이터베이스에서 공장 조회
        const factories = await db('factories').where({ game_id: gameId });
        res.status(200).json(factories);
    } catch (error) {
        console.error('공장 조회 오류:', error.message);
        res.status(500).json({ error: '공장 조회에 실패했습니다.' });
    }
};

// 공장 업그레이드
exports.upgradeFactory = async (req, res) => {
    try {
        const { gameId, factoryId } = req.params;
        const { level } = req.body;

        const upgradedFactory = await db('factories')
            .where({ game_id: gameId, id: factoryId })
            .update({ level })
            .returning('*');

        if (!upgradedFactory) {
            return res.status(400).json({ error: '공장 업그레이드에 실패했습니다.', code: 400 });
        }

        res.status(200).json(upgradedFactory);
    } catch (error) {
        console.error('공장 업그레이드 오류:', error.message);
        res.status(500).json({ error: '공장 업그레이드에 실패했습니다.' });
    }
};

// 공장 철거
exports.deleteFactory = async (req, res) => {
    try {
        const { gameId, factoryId } = req.params;

        const result = await db('factories').where({ game_id: gameId, id: factoryId }).del();
        if (!result) {
            return res.status(400).json({ error: '공장 철거에 실패했습니다.', code: 400 });
        }

        res.status(200).json({ message: '공장이 철거되었습니다.' });
    } catch (error) {
        console.error('공장 철거 오류:', error.message);
        res.status(500).json({ error: '공장 철거에 실패했습니다.' });
    }
};
