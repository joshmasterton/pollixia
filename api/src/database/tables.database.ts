import { sql } from './database';

// Poll table
const createPollTable = async (name: string) => {
  await sql`CREATE TABLE IF NOT EXISTS ${sql(name)} (
		pid SERIAL PRIMARY KEY,
		question VARCHAR(200) NOT NULL,
		category VARCHAR(50) NOT NULL,
		created_at TIMESTAMPTZ DEFAULT NOW(),
		expires_at TIMESTAMPTZ NOT NULL,
		cpid VARCHAR(100) DEFAULT ''
	)`;
};

// Options table
const createOptionsTable = async (name: string) => {
  await sql`CREATE TABLE IF NOT EXISTS ${sql(name)} (
		oid SERIAL PRIMARY KEY,
		pid INT NOT NULL,
		text VARCHAR(200) NOT NULL,
		votes INT DEFAULT 0
	)`;
};

// Vote table
const createVoteTable = async (name: string) => {
  await sql`CREATE TABLE IF NOT EXISTS ${sql(name)} (
		vid SERIAL PRIMARY KEY,
		pid INT NOT NULL,
		uid VARCHAR(500),
		oid INT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT NOW()
	)`;
};

export const createTables = async (
  pollTable: string,
  voteTable: string,
  optionsTable: string,
) => {
  await createPollTable(pollTable);
  await createVoteTable(voteTable);
  await createOptionsTable(optionsTable);
};

export const dropTables = async (
  pollTable: string,
  voteTable: string,
  optionsTable: string,
) => {
  await sql`DROP TABLE IF EXISTS ${sql(pollTable)}`;
  await sql`DROP TABLE IF EXISTS ${sql(voteTable)}`;
  await sql`DROP TABLE IF EXISTS ${sql(optionsTable)}`;
};
