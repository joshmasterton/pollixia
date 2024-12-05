import { describe, expect, test } from 'vitest';
import { app } from '../../src/app';
import request from 'supertest';
import { mockIdToken } from '../utilities/mocks';

describe('/getPoll', () => {
  test('Should get a poll', async () => {
    await request(app)
      .post('/createPoll')
      .set('Authorization', `Bearer ${mockIdToken}`)
      .send({
        question: 'What is your favourite pet?',
        category: 'Lifestyle',
        lengthActive: 1,
        options: [
          {
            value: 'Cats',
          },
          {
            value: 'Dogs',
          },
        ],
      });

    await request(app)
      .post('/createPoll')
      .set('Authorization', `Bearer ${mockIdToken}`)
      .send({
        question: 'What is your favourite color?',
        category: 'Lifestyle',
        lengthActive: 1,
        options: [
          {
            value: 'Red',
          },
          {
            value: 'Purple',
          },
        ],
      });

    const getPoll = await request(app).get('/getPoll').query({
      fetchSingle: false,
      page: 0,
      isActive: true,
    });

    const getPollSingle = await request(app).get('/getPoll').query({
      fetchSingle: true,
      page: 0,
      isActive: true,
    });

    expect(getPoll.body.length).toBe(2);
    expect(getPollSingle.body.pid).toBe(2);
  });
});
