import { describe, expect, test } from 'vitest';
import { app } from '../../src/app';
import request from 'supertest';

describe('/votePoll', () => {
  test('Should vote on a poll', async () => {
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

    await request(app).post('/votePoll').send({
      oid: 1,
      pid: 1,
    });

    await request(app).post('/votePoll').send({
      oid: 2,
      pid: 1,
    });

    const votePoll = await request(app).post('/votePoll').send({
      oid: 1,
      pid: 1,
    });

    expect(votePoll.body.options[0].votes).toBe(2);
  });
});
