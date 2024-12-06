import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/dev.env` });
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;
// Test if database is ready to use
export const waitForDatabase = async () => {
    let connected = false;
    while (!connected) {
        try {
            await sql `SELECT 1`;
            connected = true;
        }
        catch {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
};
export const sql = postgres(`postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}`);
