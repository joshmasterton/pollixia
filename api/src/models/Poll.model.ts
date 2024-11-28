import { tableConfig } from '../app';
import { sql } from '../database/database';
import { PollType } from '../types/models.types';

export class Poll {
  question;
  category;
  lengthActive;
  options;

  constructor(
    question?: string,
    category?: string,
    lengthActive?: number,
    options?: {
      value: string;
    }[],
  ) {
    this.question = question;
    this.category = category;
    this.lengthActive = lengthActive;
    this.options = options;
  }

  async create() {
    // Check variables are defined
    if (
      !this.question ||
      !this.category ||
      !this.lengthActive ||
      !this.options
    ) {
      throw new Error('Missing variables');
    }

    // Calculate poll time till expire
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + this.lengthActive);

    const createdPoll =
      await sql`INSERT INTO ${sql(tableConfig.getTableConfig().pollTable)} (
			question,
			category,
			expires_at,
			options
		) VALUES (
			${this.question},
			${this.category},
			${expireTime},
			${JSON.stringify(this.options)}
		) RETURNING *`;

    // Convert string to array
    createdPoll[0].options = JSON.parse(createdPoll[0].options);

    return createdPoll[0] as PollType;
  }

  async get(fetchSingle: boolean) {
    const pollFromDatabase =
      await sql`SELECT * FROM ${sql(tableConfig.getTableConfig().pollTable)}`;

    if (pollFromDatabase.length === 0) {
      throw new Error('No polls found');
    }

    if (fetchSingle) {
      pollFromDatabase[0].options = JSON.parse(pollFromDatabase[0].options);
      return pollFromDatabase[0];
    } else {
      pollFromDatabase.forEach((poll) => {
        poll.options = JSON.parse(poll.options);
      });
      return pollFromDatabase;
    }
  }
}
