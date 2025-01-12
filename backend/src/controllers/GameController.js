// backend/src/controllers/GameController.js
const Game = require('../models/Game');
const GamePlayer = require('../models/GamePlayer');

exports.createGame = async (req, res) => {
  try {
    const { mapWidth, mapHeight, gameMode, maxPlayers } = req.body;
    // name이나 다른 필드를 받으려면 확장
    const newGame = await Game.createGame({ 
      name: req.body.name || 'Default Game Name',
      mapWidth,
      mapHeight,
      gameMode,
      maxPlayers 
    });
    return res.status(201).json({ gameId: newGame.id });
  } catch (error) {
    console.error('게임 생성 오류:', error.message);
    return res.status(500).json({ error: '게임 생성에 실패했습니다.' });
  }
};

exports.getGameStatus = async (req, res) => {
  try {
    const { gameId } = req.params;
    const status = await Game.getGameStatus(gameId);
    if (!status) {
      return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
    }
    return res.status(200).json({ pollutionLevel: status.pollution_level });
  } catch (error) {
    console.error('게임 상태 조회 오류:', error.message);
    return res.status(500).json({ error: '게임 상태 조회에 실패했습니다.' });
  }
};

// 게임 참여
exports.joinGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    // 실제로는 유저 인증(JWT 등)을 통해 userId를 가져오는 로직이 필요합니다.
    const userId = req.body.userId; 
    if (!userId) {
      return res.status(400).json({ error: 'userId가 필요합니다.' });
    }
    
    // 모델에서 joinGame 호출
    const result = await GamePlayer.joinGame(gameId, userId);
    if (!result) {
      return res.status(400).json({ error: '이미 게임에 참여 중이거나 잘못된 요청입니다.' });
    }
    
    return res.status(200).json({ success: true, message: '게임 참여 성공' });
  } catch (error) {
    console.error('게임 참여 오류:', error.message);
    return res.status(500).json({ error: '게임 참여에 실패했습니다.' });
  }
};

// 게임 나가기
exports.leaveGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId가 필요합니다.' });
    }
    
    await GamePlayer.leaveGame(gameId, userId);
    return res.status(200).json({ success: true, message: '게임 나가기 성공' });
  } catch (error) {
    console.error('게임 나가기 오류:', error.message);
    return res.status(500).json({ error: '게임 나가기에 실패했습니다.' });
  }
};

// 게임 정보 조회
exports.getGameInfo = async (req, res) => {
  try {
    const { gameId } = req.params;
    // 게임 기본 정보
    const game = await Game.getGameInfo(gameId);
    if (!game) {
      return res.status(404).json({ error: '게임을 찾을 수 없습니다.' });
    }
    // 참여 중인 플레이어 목록
    const players = await GamePlayer.getPlayersInGame(gameId);
    return res.status(200).json({
      id: game.id,
      name: game.name,
      mapWidth: game.mapWidth,
      mapHeight: game.mapHeight,
      gameMode: game.gameMode,
      maxPlayers: game.maxPlayers,
      pollutionLevel: game.pollution_level,
      players: players.map((p) => ({
        userId: p.user_id,
        joinedAt: p.joined_at,
      })),
    });
  } catch (error) {
    console.error('게임 정보 조회 오류:', error.message);
    return res.status(500).json({ error: '게임 정보 조회에 실패했습니다.' });
  }
};
