const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  try {
    const { sortBy = 'score', order = 'desc', limit = 10 } = req.query;

    // 리더보드 조회
    const leaderboard = await Leaderboard.getLeaderboard(sortBy, order, limit);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('리더보드 조회 오류:', error.message);
    res.status(500).json({ error: '리더보드 조회에 실패했습니다.' });
  }
};
