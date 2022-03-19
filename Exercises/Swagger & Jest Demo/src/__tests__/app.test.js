import typeorm from 'typeorm';
import entities from '../models/index.js';
import request from 'supertest';

import app from '../app.js';

const {createConnection, getConnection} = typeorm;

describe('Test our interests API', () => {
  beforeAll(async () => {
    await createConnection({
      type: process.env.DATABASE_TYPE,
      database: process.env.DATABASE_NAME,
      entities,
      synchronize: true
    });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('API endpoint testing', () => {
    test('GET - /api/intrest', async () => {
      const response = await request(app).get('/api/interest');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('POST - /api/user', async () => {
      const response = await request(app).post('/api/user').send({
        firstName: 'Michiel',
        lastName: 'Lovelace',
        user_meta: {
          address: 'Kilianstraat',
          zipCode: '9030',
          city: 'Gent'
        },
        roles: [{
          name: 'admin'
        }],
        interests: [{
          name: 'michiel'
        }]
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Page render testing', () => {

  });
});