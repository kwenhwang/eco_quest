const request = require('supertest');
const app = require('../../src/index');

describe('GameController', () => {
  it('should create a new game', async () => {
    const response = await request(app)
      .post('/games')
      .send({
        mapWidth: 50,
        mapHeight: 40,
        gameMode: 'multiplayer',
        maxPlayers: 4,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.gameId).toBeDefined();
    expect(response.body.status).toBe('waiting');
  });
});
