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

describe('Factory and Purification Facility API Tests', () => {
  it('should create a new factory', async () => {
    const response = await request(app)
      .post('/games/1/factories')
      .send({
        factoryType: 'basic',
        location: { x: 10, y: 20 },
      });

    expect(response.status).toBe(201);
    expect(response.body.factoryId).toBeDefined();
  });

  it('should create a new purification facility', async () => {
    const response = await request(app)
      .post('/games/1/purification-facilities')
      .send({
        facilityType: 'advanced',
        location: { x: 5, y: 8 },
      });

    expect(response.status).toBe(201);
    expect(response.body.facilityId).toBeDefined();
  });
});