// backend/src/models/GamePlayer.js
const db = require('../db');

class GamePlayer {
  static async joinGame(gameId, userId) {
    // 이미 참여했는지 중복 체크 로직이 필요할 수 있음
    const existing = await db('game_players').where({ game_id: gameId, user_id: userId }).first();
    if (existing) {
      // 이미 참여 중인 경우 null 이나 에러 throw 등을 하도록 할 수 있음
      return null;
    }

    const [newRecord] = await db('game_players')
      .insert({ game_id: gameId, user_id: userId })
      .returning('*');
    return newRecord;
  }

  static async leaveGame(gameId, userId) {
    return db('game_players')
      .where({ game_id: gameId, user_id: userId })
      .del();
  }

  static async getPlayersInGame(gameId) {
    return db('game_players')
      .where({ game_id: gameId })
      .select('*');
  }
}

module.exports = GamePlayer;
