import { describe, expect, test } from 'vitest';
import { app } from '../../src/app';
import request from 'supertest';

describe('/createPoll', () => {
  test('Should create new poll', async () => {
    const createPoll = await request(app)
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

    expect(createPoll.body.pid).toBe(1);
    expect(createPoll.body.question).toBe('What is your favourite pet?');
  });
});
