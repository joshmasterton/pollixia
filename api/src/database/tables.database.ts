import { sql } from './database';

const createPollTable = async (name: string) => {
  await sql`CREATE TABLE IF NOT EXISTS ${sql(name)} (
		pid SERIAL PRIMARY KEY,
		question VARCHAR(200) NOT NULL,
		category VARCHAR(50) NOT NULL,
		options JSONB NOT NULL,
		created_at TIMESTAMPTZ DEFAULT NOW(),
		expires_at TIMESTAMPTZ NOT NULL
	)`;
};

export const createTables = async (pollTable: string) => {
  console.log(`Created ${pollTable}`);
  await createPollTable(pollTable);
};

export const dropTables = async (pollTable: string) => {
  await sql`DROP TABLE IF EXISTS ${sql(pollTable)}`;
  console.log(`Dropped ${pollTable}`);
};
