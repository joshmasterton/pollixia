import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/dev.env` });

const { POSTGRES_URL } = process.env;

// Test if database is ready to use
export const waitForDatabase = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sql`SELECT 1`;
      connected = true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

export const sql = postgres(`${POSTGRES_URL}`);
