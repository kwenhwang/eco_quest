// backend/src/models/PurificationFacility.js

const knex = require('../db'); // Knex 인스턴스 불러오기

class PurificationFacility {
  // 정수 시설 생성
  static async buildPurificationFacility(gameId, facilityType, location) {
    const [facility] = await knex('purification_facilities')
      .insert({
        game_id: gameId,
        facility_type: facilityType,
        location_x: location.x,
        location_y: location.y,
        purification_rate: 2, // 기본값
        cost_per_tick: 100, // 기본값
        is_active: true,
        created_at: knex.fn.now(),
      })
      .returning('*');
    return facility;
  }

  // 특정 게임의 정수 시설 목록 조회
  static async getPurificationFacilitiesByGame(gameId) {
    return await knex('purification_facilities').where({ game_id: gameId }).select('*');
  }

  // 특정 정수 시설 정보 조회
  static async getPurificationFacilityById(facilityId) {
    return await knex('purification_facilities').where({ facility_id: facilityId }).first();
  }

  // 정수 시설 업그레이드
  static async upgradePurificationFacility(facilityId, newType, purificationRate, costPerTick) {
    return await knex('purification_facilities')
      .where({ facility_id: facilityId })
      .update({
        facility_type: newType,
        purification_rate: purificationRate,
        cost_per_tick: costPerTick,
      })
      .returning('*');
  }

  // 정수 시설 철거
  static async deletePurificationFacility(facilityId) {
    return await knex('purification_facilities').where({ facility_id: facilityId }).del();
  }
}

module.exports = PurificationFacility;
