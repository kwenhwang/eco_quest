// backend/tests/integration/game.test.js
const request = require('supertest');
const app = require('../../src/index');
const { setupTestDB } = require('../setup');

// 테스트 DB 설정 적용
setupTestDB();

describe('Game API Tests', () => {
  let testUser;
  
  // 각 테스트 전에 필요한 기본 데이터 생성
  beforeEach(async () => {
    // 테스트용 유저 생성 (게임 생성/참여에 필요할 경우)
    testUser = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        password: 'testpass',
        email: 'test@example.com'
      });

    // 테스트용 게임 생성 (상태 조회 테스트 등에 필요)
    await request(app)
      .post('/games')
      .send({
        name: 'Test Game',
        mapWidth: 50,
        mapHeight: 50,
        gameMode: 'singleplayer',
        maxPlayers: 1
      });
  });

  describe('Game Creation', () => {
    it('should create a new game', async () => {
      const response = await request(app)
        .post('/games')
        .send({
          name: 'New Test Game',
          mapWidth: 50,
          mapHeight: 50,
          gameMode: 'singleplayer',
          maxPlayers: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.gameId).toBeDefined();
    });
  });

  describe('Game Status', () => {
    it('should retrieve game status', async () => {
      const response = await request(app)
        .get('/games/1/status');
      
      expect(response.status).toBe(200);
      expect(response.body.pollutionLevel).toBeDefined();
    });
  });

  describe('Game Players', () => {
    it('should allow a user to join a game', async () => {
      const response = await request(app)
        .post('/games/1/join')
        .send({
          userId: testUser.body.userId
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should allow a user to leave a game', async () => {
      // 먼저 게임 참여
      await request(app)
        .post('/games/1/join')
        .send({
          userId: testUser.body.userId
        });

      // 게임 나가기 테스트
      const response = await request(app)
        .post('/games/1/leave')
        .send({
          userId: testUser.body.userId
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('Game Information', () => {
    it('should retrieve complete game information', async () => {
      const response = await request(app)
        .get('/games/1/info');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('mapWidth');
      expect(response.body).toHaveProperty('mapHeight');
      expect(response.body).toHaveProperty('gameMode');
      expect(response.body).toHaveProperty('maxPlayers');
      expect(response.body).toHaveProperty('pollutionLevel');
      expect(response.body).toHaveProperty('players');
    });
  });
});
