//컨트롤러는 모델 파일을 통해 데이터베이스와 상호작용합니다.
// backend/src/models/Factory.js

const knex = require('../db'); // Knex 인스턴스 불러오기

class Factory {
    // 공장 건설
    static async build(gameId, factoryType, location) {
        // 공장 유형과 비용 확인 (예시)
        const factoryTypes = {
            basic: { cost: 2000, productionRate: 100, pollutionRate: 1, maintenanceCost: 10 },
            medium: { cost: 3500, productionRate: 300, pollutionRate: 3, maintenanceCost: 25 },
            large: { cost: 5000, productionRate: 500, pollutionRate: 5, maintenanceCost: 40 }
        };

        const type = factoryTypes[factoryType];
        if (!type) {
            throw new Error('Invalid factory type');
        }

        // 플레이어의 크레딧 차감 로직 필요 (예시 생략)

        // 공장 삽입
        const [factory] = await knex('factories')
            .insert({
                game_id: gameId,
                factory_type: factoryType,
                level: 1,
                production_rate: type.productionRate,
                pollution_rate: type.pollutionRate,
                maintenance_cost: type.maintenanceCost,
                location_x: location.x,
                location_y: location.y,
                is_active: true,
                construction_start_time: knex.fn.now(),
                construction_duration: 60 // 예시: 60초
            })
            .returning('*');

        return factory;
    }

    // 게임 ID로 모든 공장 조회
    static async getAllByGameId(gameId) {
        return await knex('factories').where({ game_id: gameId }).select('*');
    }

    // 특정 공장 조회
    static async getById(gameId, factoryId) {
        return await knex('factories').where({ game_id: gameId, factory_id: factoryId }).first();
    }

    // 공장 업그레이드
    static async upgrade(gameId, factoryId, level) {
        // 업그레이드 로직 (비용, 최대 레벨 등 확인 필요)

        // 공장 레벨 업데이트
        const [factory] = await knex('factories')
            .where({ game_id: gameId, factory_id: factoryId })
            .update({ level, production_rate: level * 100, pollution_rate: level * 1, maintenance_cost: level * 10 })
            .returning('*');

        return factory;
    }

    // 공장 철거
    static async delete(gameId, factoryId) {
        const deleted = await knex('factories').where({ game_id: gameId, factory_id: factoryId }).del();
        return deleted > 0;
    }
}

module.exports = Factory;
