const request = require('supertest');
const app = require('../../src/index');
const { setupTestDB } = require('../setup');

// DB 초기화 설정 적용
setupTestDB();

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