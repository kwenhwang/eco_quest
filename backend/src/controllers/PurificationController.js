// 역할: 정수 시설 건설, 업그레이드, 철거, 정보 조회 등의 정수 시설 관련 요청을 처리합니다.

// backend/src/controllers/PurificationController.js

const PurificationFacility = require('../models/Purification');
const Game = require('../models/Game');
const db = require('../db');

// 정수 시설 건설
exports.buildPurificationFacility = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { facilityType, location } = req.body;

        const [facility] = await db('purification_facilities').insert({
            game_id: gameId,
            facility_type: facilityType,
            location_x: location.x,
            location_y: location.y,
            purification_rate: 2,
            cost_per_tick: 100,
            created_at: db.fn.now(),
        }).returning('*');

        res.status(201).json(facility);
    } catch (error) {
        console.error('정수 시설 건설 오류:', error.message);
        res.status(500).json({ error: '정수 시설 건설에 실패했습니다.' });
    }
};

// 정수 시설 정보 조회
exports.getPurificationFacilities = async (req, res) => {
    try {
        const { gameId } = req.params;

        const facilities = await db('purification_facilities').where({ game_id: gameId });
        res.status(200).json(facilities);
    } catch (error) {
        console.error('정수 시설 정보 조회 오류:', error.message);
        res.status(500).json({ error: '정수 시설 정보 조회에 실패했습니다.', code: 500 });
    }
};

exports.getPurificationFacility = async (req, res) => {
    try {
        const { gameId, facilityId } = req.params;

        const facility = await PurificationFacility.getById(gameId, facilityId);
        if (!facility) {
            return res.status(404).json({ error: '정수 시설을 찾을 수 없습니다.', code: 404 });
        }

        res.status(200).json(facility);
    } catch (error) {
        console.error('특정 정수 시설 정보 조회 오류:', error);
        res.status(500).json({ error: '특정 정수 시설 정보 조회에 실패했습니다.', code: 500 });
    }
};

exports.upgradePurificationFacility = async (req, res) => {
    try {
        const { gameId, facilityId } = req.params;
        const { facilityType } = req.body;

        const upgradedFacility = await PurificationFacility.upgrade(gameId, facilityId, facilityType);
        if (!upgradedFacility) {
            return res.status(400).json({ error: '정수 시설 업그레이드에 실패했습니다.', code: 400 });
        }

        res.status(200).json(upgradedFacility);
    } catch (error) {
        console.error('정수 시설 업그레이드 오류:', error);
        res.status(500).json({ error: '정수 시설 업그레이드에 실패했습니다.', code: 500 });
    }
};

// 정수 시설 철거
exports.deletePurificationFacility = async (req, res) => {
    try {
        const { gameId, facilityId } = req.params;

        const result = await db('purification_facilities').where({ game_id: gameId, id: facilityId }).del();
        if (!result) {
            return res.status(400).json({ error: '정수 시설 철거에 실패했습니다.', code: 400 });
        }

        res.status(200).json({ message: '정수 시설이 철거되었습니다.' });
    } catch (error) {
        console.error('정수 시설 철거 오류:', error.message);
        res.status(500).json({ error: '정수 시설 철거에 실패했습니다.', code: 500 });
    }
};
