// Controller tests for Factory 
const request = require('supertest');
const app = require('../../src/index');

describe('FactoryController', () => {
  it('should create a new factory', async () => {
    const response = await request(app)
      .post('/games/1/factories')
      .send({
        factoryType: 'basic',
        location: { x: 10, y: 20 },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('factoryId');
  });

  it('should fetch all factories for a game', async () => {
    const response = await request(app).get('/games/1/factories');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

