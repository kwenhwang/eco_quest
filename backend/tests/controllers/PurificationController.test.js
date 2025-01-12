// Controller tests for Purification 
const request = require('supertest');
const app = require('../../src/index');

describe('PurificationController', () => {
  it('should create a new purification facility', async () => {
    const response = await request(app)
      .post('/games/1/purification-facilities')
      .send({
        facilityType: 'basic',
        location: { x: 15, y: 10 },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('facilityId');
  });

  it('should fetch all purification facilities for a game', async () => {
    const response = await request(app).get('/games/1/purification-facilities');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
