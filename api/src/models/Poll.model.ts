import { tableConfig } from '../app';
import { sql } from '../database/database';
import { PollType } from '../types/model.types';

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
    expireTime.setMinutes(
      expireTime.getMinutes() + Math.round(this.lengthActive / 15) * 15,
    );

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

  async get(
    fetchSingle: boolean,
    pid?: number,
    uid?: string,
    page = 0,
    isActive: boolean = true,
  ) {
    const pollFromDatabase = await sql`
			SELECT p.*, o.*, v.oid as user_vote	
			FROM (SELECT * FROM ${sql(tableConfig.getTableConfig().pollTable)} ORDER BY created_at DESC LIMIT ${10} OFFSET ${page * 10}) p
			LEFT JOIN ${sql(tableConfig.getTableConfig().optionsTable)} o ON o.pid = p.pid
			LEFT JOIN ${sql(tableConfig.getTableConfig().voteTable)} v ON v.pid = p.pid ${uid ? sql`AND v.uid = ${uid}` : sql``}
			${pid ? sql`WHERE p.pid = ${pid}` : sql``}
			${isActive ? (pid ? sql`AND expires_at > CURRENT_TIMESTAMP` : sql`WHERE expires_at > CURRENT_TIMESTAMP`) : sql``}
			ORDER BY created_at DESC, p.pid, o.oid
		`;

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
        isSelected: row.user_vote === row.oid,
      });

      return acc;
    }, []);

    if (fetchSingle) {
      return polls[0] as PollType;
    } else {
      return polls as PollType[];
    }
  }

  async vote(oid: number, pid: number, uid: string) {
    const poll = await sql`
			SELECT expires_at
			FROM ${sql(tableConfig.getTableConfig().pollTable)}
			WHERE pid = ${pid}
		`;

    if (poll.length === 0) {
      throw new Error('No poll found');
    }

    const expires_at = new Date(poll[0].expires_at);
    const current_date = new Date();

    if (current_date > expires_at) {
      throw new Error('This poll has expired and you can no longer vote');
    }

    const existingVote = await sql`
			SELECT * FROM ${sql(tableConfig.getTableConfig().voteTable)}
			WHERE pid = ${pid}
			AND uid = ${uid}
		`;

    if (existingVote[0]) {
      if (existingVote[0].oid !== oid) {
        await sql`
					UPDATE ${sql(tableConfig.getTableConfig().optionsTable)}
					SET votes = votes - 1
					WHERE oid = ${existingVote[0].oid}
				`;

        await sql`
					UPDATE ${sql(tableConfig.getTableConfig().optionsTable)}
					SET votes = votes + 1
					WHERE oid = ${oid}
				`;

        await sql`
					UPDATE ${sql(tableConfig.getTableConfig().voteTable)}
					SET oid = ${oid}
					WHERE pid = ${pid}
					AND uid = ${uid}
				`;
      }
    } else {
      await sql`
				INSERT INTO ${sql(tableConfig.getTableConfig().voteTable)} (
					pid, oid, uid
				) VALUES (
					${pid},
					${oid},
					${uid}
				)
			`;

      await sql`
				UPDATE ${sql(tableConfig.getTableConfig().optionsTable)}
				SET votes = votes + 1
				WHERE oid = ${oid}
			`;
    }
  }
}
