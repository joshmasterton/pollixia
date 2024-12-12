import { createPollRoute } from './routes/createPoll.route';
import { createTables } from './database/tables.database';
import { TableConfig } from './database/tableConfig.database';
import { getPollRoute } from './routes/getPoll.route';
import { votePollRoute } from './routes/votePoll.route';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import './utilities/firebaseAdmin';
dotenv.config({ path: `${process.cwd()}/dev.env` });

export const app = express();
export const tableConfig = new TableConfig('polls', 'votes', 'options');

const { PORT, CLIENT_URL, API_URL, TEST } = process.env;

app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

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

  createTables(
    tableConfig.getTableConfig().pollTable,
    tableConfig.getTableConfig().voteTable,
    tableConfig.getTableConfig().optionsTable,
  );

  app.listen(PORT, async () => {
    console.log(`Server running at ${API_URL}`);
  });
}
