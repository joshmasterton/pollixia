import { describe, expect, test } from 'vitest';
import { app } from '../../src/app';
import request from 'supertest';
import { mockIdToken } from '../utilities/mocks';

describe('/votePoll', () => {
  test('Should vote on a poll', async () => {
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

    const votePoll = await request(app)
      .post('/votePoll')
      .set('Authorization', `Bearer ${mockIdToken}`)
      .send({
        oid: 1,
        pid: 1,
      });

    expect(votePoll.body.options[0].votes).toBe(1);
  });

  test('Should switch vote if user changed their mind', async () => {
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

    const firstVotePoll = await request(app)
      .post('/votePoll')
      .set('Authorization', `Bearer ${mockIdToken}`)
      .send({
        oid: 1,
        pid: 1,
      });

    const votePoll = await request(app)
      .post('/votePoll')
      .set('Authorization', `Bearer ${mockIdToken}`)
      .send({
        oid: 2,
        pid: 1,
      });

    const getPoll = await request(app).get('/getPoll').query({
      fetchSingle: false,
      uid: '1',
      page: 0,
      isActive: true,
    });

    expect(getPoll.body[0].options[1].isSelected).toBe(true);
    expect(firstVotePoll.body.options[0].votes).toBe(1);
    expect(firstVotePoll.body.options[1].votes).toBe(0);
    expect(votePoll.body.options[0].votes).toBe(0);
    expect(votePoll.body.options[1].votes).toBe(1);
  });
});
