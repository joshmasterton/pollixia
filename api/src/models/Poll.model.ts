import postgres from 'postgres';
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

    const createdPoll = await sql`
			INSERT INTO ${sql(tableConfig.getTableConfig().pollTable)} (
				question,
				category,
				expires_at
			) VALUES (
				${this.question},
				${this.category},
				${expireTime}
			) RETURNING *`;

    const createdOptions = await sql`
			INSERT INTO ${sql(tableConfig.getTableConfig().optionsTable)} (
				pid, text
			) VALUES ${sql(this.options.map((option) => [createdPoll[0].pid, option.value]))} RETURNING *
		`;

    return {
      createdPoll: createdPoll[0] as PollType,
      createdOptions: createdOptions,
    };
  }

  async get(fetchSingle: boolean, pid?: number) {
    let pollFromDatabase: postgres.RowList<postgres.Row[]>;
    if (pid) {
      pollFromDatabase = await sql`
				SELECT p.*, o.*	
				FROM ${sql(tableConfig.getTableConfig().pollTable)} p
				LEFT JOIN ${sql(tableConfig.getTableConfig().optionsTable)} o ON o.pid = p.pid
				WHERE p.pid = ${pid}
				ORDER BY created_at DESC, p.pid, o.oid
			`;
    } else {
      pollFromDatabase = await sql`
				SELECT p.*, o.*	
				FROM ${sql(tableConfig.getTableConfig().pollTable)} p
				LEFT JOIN ${sql(tableConfig.getTableConfig().optionsTable)} o ON o.pid = p.pid
				ORDER BY created_at DESC, p.pid, o.oid
			`;
    }

    if (pollFromDatabase.length === 0) {
      throw new Error('No polls found');
    }

    const polls = pollFromDatabase.reduce((acc, row) => {
      let existingPoll = acc.find((poll: PollType) => poll.pid === row.pid);

      if (!existingPoll) {
        existingPoll = {
          pid: row.pid,
          question: row.question,
          category: row.category,
          created_at: row.created_at,
          expires_at: row.expires_at,
          options: [],
        };
        acc.push(existingPoll);
      }

      existingPoll.options.push({
        oid: row.oid,
        text: row.text,
        votes: row.votes,
      });

      return acc;
    }, []);

    if (fetchSingle) {
      return polls[0] as PollType;
    } else {
      return polls as PollType[];
    }
  }

  async vote(oid: number, pid: number, uid?: string) {
    if (uid) {
      await sql`
			INSERT INTO ${sql(tableConfig.getTableConfig().voteTable)} (
				pid, oid, uid
			) VALUES (
				${pid},
				${oid},
				${uid}
			)
		`;
    } else {
      await sql`
			INSERT INTO ${sql(tableConfig.getTableConfig().voteTable)} (
				pid, oid
			) VALUES (
				${pid},
				${oid}
			)
		`;
    }

    await sql`
			UPDATE ${sql(tableConfig.getTableConfig().optionsTable)}
			SET votes = votes + 1
			WHERE oid = ${oid}
		`;
  }
}
