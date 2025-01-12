const request = require('supertest');
const app = require('../../src/index');
const db = require('../../src/db');
const { setupTestDB } = require('../testSetup');

// DB 초기화 설정 적용
setupTestDB();

describe('User API Tests', () => {
  beforeEach(async () => {
    // 테스트 전 테이블 초기화
    await db('users').del();
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'testpass123',
        email: 'test@example.com',
        nickname: 'TestUser'
      });

    expect(response.status).toBe(201);
    expect(response.body.userId).toBeDefined();
  });

  it('should login a user', async () => {
    // 먼저 사용자 생성
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'logintest',
        password: 'testpass123',
        email: 'login@example.com',
        nickname: 'LoginTest'
      });

    // 로그인 시도
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'logintest',
        password: 'testpass123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not register user with duplicate username', async () => {
    // 첫 번째 사용자 등록
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'testpass123',
        email: 'test@example.com',
        nickname: 'TestUser'
      });

    // 같은 username으로 두 번째 등록 시도
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'different123',
        email: 'different@example.com',
        nickname: 'DifferentUser'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should not login with wrong password', async () => {
    // 사용자 등록
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'logintest',
        password: 'testpass123',
        email: 'login@example.com',
        nickname: 'LoginTest'
      });

    // 잘못된 비밀번호로 로그인 시도
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'logintest',
        password: 'wrongpass'
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });
});