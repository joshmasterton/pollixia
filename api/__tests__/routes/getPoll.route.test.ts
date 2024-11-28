import { describe, expect, test } from 'vitest';
import { app } from '../../src/app';
import request from 'supertest';

describe('/getPoll', () => {
  test('Should get a poll', async () => {
    await request(app)
      .post('/createPoll')
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
    });

    const getPollSingle = await request(app).get('/getPoll').query({
      fetchSingle: true,
    });

    expect(getPoll.body.length).toBe(2);
    expect(getPollSingle.body.pid).toBe(1);
  });
});
