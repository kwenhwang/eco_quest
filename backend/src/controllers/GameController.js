const Game = require('../models/Game');
const Player = require('../models/Player');
const Factory = require('../models/Factory');
const PurificationFacility = require('../models/Purification');
const knex = require('../db'); // Knex 인스턴스 불러오기
const db = require('../db');

// 게임 생성
exports.createGame = async (req, res) => {
    try {
        const { mapWidth, mapHeight, gameMode, maxPlayers } = req.body;

        // 입력 값 검증
        if (!mapWidth || !mapHeight || !gameMode || !maxPlayers) {
            return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
        }

        const [newGame] = await db('games')
            .insert({
                mapWidth,
                mapHeight,
                gameMode,
                maxPlayers,
                status: 'waiting',
                created_at: db.fn.now(),
            })
            .returning('*');

        res.status(201).json({ gameId: newGame.id });
    } catch (error) {
        console.error('게임 생성 오류:', error.message);
        res.status(500).json({ error: '게임 생성에 실패했습니다.' });
    }
};

// 게임 참여
exports.joinGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { playerId } = req.body;

        const game = await db('games').where({ game_id: gameId }).first();
        if (!game) {
            return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
        }

        const currentPlayers = await db('game_participation').where({ game_id: gameId }).count('player_id as count').first();
        if (currentPlayers.count >= game.max_players) {
            return res.status(400).json({ error: '게임이 가득 찼습니다.' });
        }

        const [participation] = await db('game_participation')
            .insert({ game_id: gameId, player_id: playerId })
            .returning('*');

        res.status(201).json(participation);
    } catch (error) {
        console.error('게임 참여 오류:', error.message);
        res.status(500).json({ error: '게임 참여에 실패했습니다.' });
    }
};

// 게임 나가기
exports.leaveGame = async (req, res) => {
    try {
        const { gameId, playerId } = req.params;

        const result = await db('game_participation').where({ game_id: gameId, player_id: playerId }).del();
        if (!result) {
            return res.status(400).json({ error: '게임 나가기에 실패했습니다.' });
        }

        res.status(200).json({ message: '플레이어가 게임에서 나갔습니다.' });
    } catch (error) {
        console.error('게임 나가기 오류:', error.message);
        res.status(500).json({ error: '게임 나가기에 실패했습니다.' });
    }
};

// 게임 정보 조회
exports.getGameInfo = async (req, res) => {
    try {
        const { gameId } = req.params;

        const game = await Game.getInfoWithSimulation(gameId);
        if (!game) {
            return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error('게임 정보 조회 오류:', error.message);
        res.status(500).json({ error: '게임 정보 조회에 실패했습니다.' });
    }
};

// 게임 상태 정보 조회
exports.getGameStatus = async (req, res) => {
    try {
        const { gameId } = req.params;
        console.log('Attempting to get status for game:', gameId);

        const game = await db('games').where({ id: gameId }).first();
        console.log('Found game:', game);

        if (!game) {
            console.log('Game not found');
            return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
        }

        res.status(200).json({ pollutionLevel: game.pollution_level });
    } catch (error) {
        console.error('게임 상태 조회 오류:', error);
        res.status(500).json({ error: '게임 상태 조회에 실패했습니다.' });
    }
};

// 공장 건설
exports.buildFactory = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { factoryType, location } = req.body;

        // 공장 데이터 삽입
        const [factory] = await db('factories').insert({
            game_id: gameId,
            factory_type: factoryType,
            location_x: location.x,
            location_y: location.y,
            level: 1,
            production_rate: 100,
            pollution_rate: 1,
            created_at: db.fn.now(),
        }).returning('*');

        res.status(201).json(factory);
    } catch (error) {
        console.error('공장 건설 오류:', error.message);
        res.status(500).json({ error: '공장 건설에 실패했습니다.' });
    }
};