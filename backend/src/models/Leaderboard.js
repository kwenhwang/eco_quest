const db = require('../db');

class Leaderboard {
  // 리더보드 가져오기
  static async getLeaderboard(sortBy = 'score', order = 'desc', limit = 10) {
    return db('leaderboard')
      .join('players', 'leaderboard.player_id', 'players.player_id')
      .select('players.name', 'leaderboard.score', 'leaderboard.updated_at')
      .orderBy(sortBy, order)
      .limit(limit);
  }
}

module.exports = Leaderboard;
