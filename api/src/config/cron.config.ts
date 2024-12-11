import { CronJob } from 'cron';
import { botVote } from '../bot/vote.bot';

export const botVoteJob = new CronJob('*/10 * * * * *', async () => {
  await botVote();
});
