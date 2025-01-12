// Controller tests for Player 
const request = require('supertest');
const app = require('../../src/index');

describe('PlayerController', () => {
  it('should fetch player details by ID', async () => {
    const response = await request(app).get('/players/123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  it('should update player information', async () => {
    const response = await request(app)
      .put('/players/123')
      .send({
        name: 'UpdatedPlayerName',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('UpdatedPlayerName');
  });
});
