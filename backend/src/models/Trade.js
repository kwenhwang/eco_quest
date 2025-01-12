const db = require('../db');

class Trade {
  // 거래 생성
  static async create({ gameId, senderId, receiverId, resourceId, quantity }) {
    const [trade] = await db('trades').insert({
      game_id: gameId,
      sender_id: senderId,
      receiver_id: receiverId,
      resource_id: resourceId,
      quantity,
      status: 'pending',
      created_at: db.fn.now(),
    }).returning('*');

    return trade;
  }

  // 특정 게임의 거래 조회
  static async findByGameId(gameId) {
    return db('trades')
      .where({ game_id: gameId })
      .select('trade_id', 'sender_id', 'receiver_id', 'resource_id', 'quantity', 'status', 'created_at');
  }
}

module.exports = Trade;
