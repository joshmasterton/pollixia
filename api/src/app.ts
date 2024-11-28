import { createPollRoute } from './routes/createPoll.route';
import { createTables, dropTables } from './database/tables.database';
import { TableConfig } from './database/tableConfig.database';
import { getPollRoute } from './routes/getPoll.route';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/dev.env` });

export const app = express();
export const tableConfig = new TableConfig('polls');

const { PORT, API_URL, TEST } = process.env;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(createPollRoute);
app.use(getPollRoute);

if (!TEST) {
  dropTables(tableConfig.getTableConfig().pollTable).then(() => {
    createTables(tableConfig.getTableConfig().pollTable);
  });

  app.listen(PORT, async () => {
    console.log(`Server running at ${API_URL}`);
  });
}
