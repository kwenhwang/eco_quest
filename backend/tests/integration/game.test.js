require('dotenv').config();
const express = require('express');
const app = express();
const request = require('supertest');
const db = require('../../src/db');

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 라우터 불러오기
const router = require('./routes'); // 전체 라우터 파일

// 미들웨어 설정
app.use(express.json());

// API 라우터 연결
app.use('/api', router);

// DB 연결 확인
db.raw('SELECT 1+1 AS result')
  .then((res) => console.log('DB 연결 성공:', res.rows))
  .catch((err) => console.error('DB 연결 실패:', err.message));

// 서버 실행 (테스트 환경에서는 동적으로 포트 할당)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
}

beforeAll(async () => {
  await db.migrate.latest(); // 최신 마이그레이션 실행
  await db.seed.run();       // 초기 데이터 삽입
});

afterAll(async () => {
  await db.destroy(); // 데이터베이스 연결 해제
});

describe('Game API Tests', () => {
  it('should create a new game', async () => {
    const response = await request(app)
      .post('/api/games')
      .send({
        mapWidth: 50,
        mapHeight: 50,
        gameMode: 'singleplayer',
        maxPlayers: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.gameId).toBeDefined();
  });

  it('should retrieve game status', async () => {
    const response = await request(app).get('/api/games/1/status');
    expect(response.status).toBe(200);
    expect(response.body.pollutionLevel).toBeDefined();
  });
});

module.exports = app; // 테스트를 위해 app을 모듈로 내보냄