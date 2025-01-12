// 컨트롤러 파일은 모델 파일을 통해 데이터베이스와 상호작용합니다. 여기서는 간단한 예시로 Game.js 모델 파일의 일부를 소개합니다. Knex.js를 이용하여 데이터베이스 작업을 수행합니다.

// backend/src/models/Game.js

const db = require('../db'); // Knex 인스턴스 불러오기

class Game {
    // 새 게임 생성
    static async create({ mapWidth, mapHeight }) {
        const [game] = await db('games')
            .insert({
                map_width: mapWidth,
                map_height: mapHeight,
                status: 'waiting',
                created_at: db.fn.now() // created_at 필드 추가
            })
            .returning('*');
        return game;
    }

    // 게임 ID로 게임 찾기
    static async findById(gameId) {
        const game = await db('games').where({ game_id: gameId }).first();
        return game;
    }

    // 플레이어 참여
    static async joinPlayer(gameId, playerId) {
        // 현재 참여 인원 수 확인
        const game = await this.findById(gameId);
        const currentPlayers = await db('game_participation').where({ game_id: gameId }).count('player_id as count').first();
        if (currentPlayers.count >= game.max_players) {
            return false; // 게임이 가득 참
        }

        // 이미 참여 중인지 확인
        const existing = await db('game_participation').where({ game_id: gameId, player_id: playerId }).first();
        if (existing) {
            return false; // 이미 참여 중
        }

        // 참여 추가
        await db('game_participation').insert({
            game_id: gameId,
            player_id: playerId,
            joined_at: db.fn.now()
        });

        return true;
    }

    // 플레이어 나가기
    static async leavePlayer(gameId, playerId) {
        const deleted = await db('game_participation').where({ game_id: gameId, player_id: playerId }).del();
        return deleted > 0;
    }

    // 게임 정보와 오프라인 시뮬레이션 결과 포함하여 조회
    static async getInfoWithSimulation(gameId) {
        // 여기서 오프라인 시뮬레이션 결과를 반영하는 로직을 추가
        const game = await this.findById(gameId);
        if (!game) return null;

        // 관련 데이터 조회
        const players = await db('game_participation')
            .join('players', 'game_participation.player_id', 'players.player_id')
            .where('game_participation.game_id', gameId)
            .select('players.player_id', 'players.name', 'players.user_id');

        const factories = await db('factories').where({ game_id: gameId }).select('*');
        const purificationFacilities = await db('purification_facilities').where({ game_id: gameId }).select('*');

        // 오프라인 시뮬레이션 결과 적용 (예시)
        const simulationResult = await this.runOfflineSimulation(gameId);

        return {
            gameId: game.game_id,
            currentTick: simulationResult.currentTick,
            pollutionLevel: simulationResult.pollutionLevel,
            day: simulationResult.day,
            lastActivity: simulationResult.lastActivity,
            players,
            factories,
            purificationFacilities
        };
    }

    // 게임 상태 조회
    static async getStatus(gameId) {
        const game = await this.findById(gameId);
        if (!game) return null;

        // 현재 환경 상태 및 시간 정보
        const status = {
            gameId: game.game_id,
            pollutionLevel: game.pollution_level,
            credits: await this.getPlayerCredits(gameId),
            currentTick: game.current_tick,
            day: game.current_day,
            lastActivity: game.last_activity
        };

        return status;
    }

    // 플레이어별 크레딧 조회 (예시)
    static async getPlayerCredits(gameId) {
        const credits = await db('player_resources')
            .join('players', 'player_resources.player_id', 'players.player_id')
            .where('player_resources.resource_id', '=', 1) // 크레딧 자원 ID 가정
            .select('players.player_id', 'players.name', 'player_resources.quantity');

        const creditMap = {};
        credits.forEach(credit => {
            creditMap[credit.player_id] = credit.quantity;
        });

        return creditMap;
    }

    // 오프라인 시뮬레이션 구현 (예시)
    static async runOfflineSimulation(gameId) {
        // 실제 시뮬레이션 로직에 따라 수정 필요
        // 예를 들어, 현재 게임의 상태를 시간 단위로 업데이트
        // 여기서는 간단한 예시를 제공합니다.

        // 게임 상태 업데이트 로직
        await db.transaction(async trx => {
            // 현재 하루를 증가시킴
            await trx('games')
                .where({ game_id: gameId })
                .update({
                    day: db.raw('day + 1'),
                    current_tick: db.raw('current_tick + 1440'), // 1일을 분 단위로 가정
                    last_activity: db.fn.now()
                });

            // 오염도 계산 (예시)
            const totalPollution = await trx('factories')
                .where({ game_id: gameId })
                .sum('pollution_rate as total');

            const totalPurification = await trx('purification_facilities')
                .where({ game_id: gameId })
                .sum('purification_rate as total');

            let newPollutionLevel = totalPollution[0].total - totalPurification[0].total + 0.5; // 자연 정화율 추가
            newPollutionLevel = Math.max(newPollutionLevel, 0);
            newPollutionLevel = Math.min(newPollutionLevel, 100);

            await trx('games')
                .where({ game_id: gameId })
                .update({ pollution_level: newPollutionLevel });
        });

        // 조회 후 반환
        const game = await this.findById(gameId);
        return {
            currentTick: game.current_tick,
            pollutionLevel: game.pollution_level,
            day: game.day,
            lastActivity: game.last_activity
        };
    }
}

module.exports = Game;
