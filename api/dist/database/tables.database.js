import { sql } from './database.js';
// Poll table
const createPollTable = async (name) => {
    await sql `CREATE TABLE IF NOT EXISTS ${sql(name)} (
		pid SERIAL PRIMARY KEY,
		question VARCHAR(200) NOT NULL,
		category VARCHAR(50) NOT NULL,
		created_at TIMESTAMPTZ DEFAULT NOW(),
		expires_at TIMESTAMPTZ NOT NULL
	)`;
};
// Options table
const createOptionsTable = async (name) => {
    await sql `CREATE TABLE IF NOT EXISTS ${sql(name)} (
		oid SERIAL PRIMARY KEY,
		pid INT NOT NULL,
		text VARCHAR(200) NOT NULL,
		votes INT DEFAULT 0
	)`;
};
// Vote table
const createVoteTable = async (name) => {
    await sql `CREATE TABLE IF NOT EXISTS ${sql(name)} (
		vid SERIAL PRIMARY KEY,
		pid INT NOT NULL,
		uid VARCHAR(500),
		oid INT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT NOW()
	)`;
};
export const createTables = async (pollTable, voteTable, optionsTable) => {
    await createPollTable(pollTable);
    await createVoteTable(voteTable);
    await createOptionsTable(optionsTable);
};
export const dropTables = async (pollTable, voteTable, optionsTable) => {
    await sql `DROP TABLE IF EXISTS ${sql(pollTable)}`;
    await sql `DROP TABLE IF EXISTS ${sql(voteTable)}`;
    await sql `DROP TABLE IF EXISTS ${sql(optionsTable)}`;
};
