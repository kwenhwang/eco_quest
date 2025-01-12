const request = require('supertest');
const app = require('../../src/index');
const db = require('../../src/db');

beforeAll(async () => {
    // 모든 마이그레이션 롤백 후 다시 실행
  await db.schema.dropTableIfExists('users');
  await db.migrate.latest(); // 최신 마이그레이션 실행
});

afterAll(async () => {
  await db.destroy(); // 데이터베이스 연결 해제
});

describe('User API Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password123!',
      });

    expect(response.status).toBe(201);
    expect(response.body.userId).toBeDefined();
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'Password123!',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});