const request = require('supertest');
const app = require('../../src/index');

describe('API 테스트', () => {
  it('GET /api/games - 게임 목록 조회', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // 추가 테스트 케이스 작성
});