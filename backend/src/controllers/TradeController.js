const Trade = require('../models/Trade');

exports.createTrade = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { senderId, receiverId, resourceId, quantity } = req.body;

    // 거래 생성
    const trade = await Trade.create({
      gameId,
      senderId,
      receiverId,
      resourceId,
      quantity,
    });

    res.status(201).json(trade);
  } catch (error) {
    console.error('자원 거래 생성 오류:', error.message);
    res.status(500).json({ error: '자원 거래 생성에 실패했습니다.' });
  }
};

exports.getTrades = async (req, res) => {
  try {
    const { gameId } = req.params;

    // 특정 게임의 모든 거래 조회
    const trades = await Trade.findByGameId(gameId);

    res.status(200).json(trades);
  } catch (error) {
    console.error('자원 거래 조회 오류:', error.message);
    res.status(500).json({ error: '자원 거래 조회에 실패했습니다.' });
  }
};
