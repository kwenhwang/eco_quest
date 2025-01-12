// tests/testSetup.js
const db = require('../src/db');

const setupTestDB = () => {
  beforeAll(async () => {
    // 테스트 시작 전 마이그레이션 실행
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
    // 테이블 구조는 유지하고 연결만 종료
    await db.destroy();
  });
};

module.exports = {
  setupTestDB
};
