import { Poll } from '../models/Poll.model.js';
export const botVote = async () => {
    try {
        const polls = (await new Poll().get(false, undefined, undefined, 0, true));
        if (!polls) {
            throw new Error('No polls found');
        }
        const randomValue = Math.floor(Math.random() * (polls ? polls.length : 0) - 0) + 0;
        const randomVoteValue = polls[randomValue].options[Math.floor(Math.random() * polls[randomValue].options.length - 0) + 0];
        await new Poll().vote(randomVoteValue.oid, polls[randomValue].pid, `${Math.floor(Math.random() * 100)}`);
        const poll = await new Poll().get(true, polls[randomValue].cpid, undefined);
        return poll;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
        console.error('Bot vote error');
    }
};
