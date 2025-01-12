//C:\Users\sword33\Documents\project\ECO_QUEST\backend\tests\setup.js
process.env.NODE_ENV = 'test';
process.env.PORT = 3001; // 테스트 환경에서 사용할 포트
jest.setTimeout(30000); // 테스트 타임아웃 30초

const db = require('../src/db');

const setupTestDB = () => {
  beforeAll(async () => {
    // 모든 테이블 롤백
    await db.migrate.rollback(undefined, true);
    // 마이그레이션 재실행
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  // 각 테스트 후 테이블 클리어
  afterEach(async () => {
    await db('game_players').del();
    await db('games').del();
    await db('users').del();
  });
};

module.exports = { setupTestDB };