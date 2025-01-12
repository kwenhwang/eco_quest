// backend/src/models/Game.js
const db = require('../db');

class Game {
  static async createGame(data) {
    const [newGame] = await db('games')
      .insert(data)
      .returning('*');
    return newGame;
  }

  static async findById(gameId) {
    return db('games').where({ id: gameId }).first();
  }

  static async getGameStatus(gameId) {
    return db('games').where({ id: gameId }).select('pollution_level').first();
  }

  // 게임 정보 조회(게임 전체 컬럼을 가져올 수도 있고, 필요하다면 특정 컬럼만)
  static async getGameInfo(gameId) {
    return db('games').where({ id: gameId }).first();
  }
}

module.exports = Game;
