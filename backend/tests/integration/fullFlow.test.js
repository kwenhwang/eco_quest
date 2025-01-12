const request = require('supertest');
const app = require('../../src/index');
const db = require('../../src/db');

beforeAll(async () => {
  await db.migrate.latest(); // 최신 마이그레이션 실행
  await db.seed.run();       // 초기 데이터 삽입
});

afterAll(async () => {
  await db.destroy(); // 데이터베이스 연결 해제
});

describe('Full API Flow Test', () => {
  let token;

  it('should register and login a user', async () => {
    await request(app)
      .post('/users/register')
      .send({
        username: 'flowtestuser',
        email: 'flowtest@example.com',
        password: 'Password123!',
      });

    const loginResponse = await request(app)
      .post('/users/login')
      .send({
        username: 'flowtestuser',
        password: 'Password123!',
      });

    token = loginResponse.body.token;
    expect(loginResponse.status).toBe(200);
    expect(token).toBeDefined();
  });

  it('should create and interact with a game', async () => {
    const gameResponse = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mapWidth: 50,
        mapHeight: 50,
        gameMode: 'multiplayer',
        maxPlayers: 4,
      });

    const gameId = gameResponse.body.gameId;
    expect(gameResponse.status).toBe(201);

    const statusResponse = await request(app).get(`/games/${gameId}/status`);
    expect(statusResponse.status).toBe(200);

    const factoryResponse = await request(app)
      .post(`/games/${gameId}/factories`)
      .set('Authorization', `Bearer ${token}`)
      .send({ factoryType: 'basic', location: { x: 10, y: 10 } });

    expect(factoryResponse.status).toBe(201);
  });
});