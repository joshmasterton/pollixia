import { describe, test } from 'vitest';
import { botVote } from '../../src/bot/vote.bot';
import { mockIdToken } from '../utilities/mocks';
import request from 'supertest';
import { app } from '../../src/app';

describe('bot vote', () => {
  test('Should vote on a random poll', async () => {
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
            value: 'red',
          },
          {
            value: 'green',
          },
        ],
      });

    const newBotVote = await botVote();

    console.log(newBotVote);
  });
});
