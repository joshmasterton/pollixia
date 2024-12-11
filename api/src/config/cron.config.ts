import { CronJob } from 'cron';
import { botVote } from '../bot/vote.bot';

export const botVoteJob = new CronJob('*/1 * * * * *', async () => {
  await botVote();
});
