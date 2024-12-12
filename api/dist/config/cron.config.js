import { CronJob } from 'cron';
import { botVote } from '../bot/vote.bot.js';
export const botVoteJob = new CronJob('*/10 * * * * *', async () => {
    await botVote();
});
