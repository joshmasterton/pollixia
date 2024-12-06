import { createPollRoute } from './routes/createPoll.route.js';
import { createTables } from './database/tables.database.js';
import { TableConfig } from './database/tableConfig.database.js';
import { getPollRoute } from './routes/getPoll.route.js';
import { votePollRoute } from './routes/votePoll.route.js';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
export const app = express();
export const tableConfig = new TableConfig('polls', 'votes', 'options');
dotenv.config({ path: `${process.cwd()}/dev.env` });
import './utilities/firebaseAdmin.js';
const { PORT, API_URL, TEST } = process.env;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(createPollRoute);
app.use(getPollRoute);
app.use(votePollRoute);
if (!TEST) {
    // dropTables(
    //   tableConfig.getTableConfig().pollTable,
    //   tableConfig.getTableConfig().voteTable,
    //   tableConfig.getTableConfig().optionsTable,
    // ).then(() => {});
    createTables(tableConfig.getTableConfig().pollTable, tableConfig.getTableConfig().voteTable, tableConfig.getTableConfig().optionsTable);
    app.listen(PORT, async () => {
        console.log(`Server running at ${API_URL}`);
    });
}
