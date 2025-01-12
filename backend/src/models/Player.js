// backend/src/models/Player.js

const knex = require('../db'); // Knex 인스턴스 불러오기

class Player {
  // 새 플레이어 생성
  static async createPlayer({ userId, name }) {
    const [player] = await knex('players')
      .insert({
        user_id: userId,
        name,
        created_at: knex.fn.now(),
      })
      .returning('*');
    return player;
  }

  // 특정 플레이어 조회
  static async findPlayerById(playerId) {
    return await knex('players').where({ player_id: playerId }).first();
  }

  // 게임에서 플레이어 삭제
  static async removePlayerFromGame(gameId, playerId) {
    return await knex('game_participation')
      .where({ game_id: gameId, player_id: playerId })
      .del();
  }

  // 플레이어가 참여 중인 게임 조회
  static async getPlayerGames(playerId) {
    return await knex('game_participation')
      .join('games', 'game_participation.game_id', 'games.game_id')
      .where({ player_id: playerId })
      .select('games.*');
  }
}

module.exports = Player;
