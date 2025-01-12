// Controller tests for Trade 
const request = require('supertest');
const app = require('../../src/index');

describe('TradeController', () => {
  it('should create a new trade', async () => {
    const response = await request(app)
      .post('/games/1/trades')
      .send({
        senderId: 123,
        receiverId: 456,
        resourceId: 1,
        quantity: 50,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('tradeId');
  });

  it('should fetch all trades for a game', async () => {
    const response = await request(app).get('/games/1/trades');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
