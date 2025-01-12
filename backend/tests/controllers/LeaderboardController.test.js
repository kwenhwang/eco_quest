// Controller tests for Leaderboard 
const request = require('supertest');
const app = require('../../src/index');

describe('LeaderboardController', () => {
  it('should fetch the leaderboard', async () => {
    const response = await request(app).get('/leaderboard?sortBy=score&order=desc');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should sort the leaderboard by pollutionScore', async () => {
    const response = await request(app).get('/leaderboard?sortBy=pollutionScore&order=asc');
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('playerId');
  });
});
