import { createPollRoute } from './routes/createPoll.route';
import { createTables } from './database/tables.database';
import { TableConfig } from './database/tableConfig.database';
import { getPollRoute } from './routes/getPoll.route';
import { votePollRoute } from './routes/votePoll.route';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import './utilities/firebaseAdmin';
dotenv.config({ path: `${process.cwd()}/dev.env` });

export const app = express();
export const tableConfig = new TableConfig('polls', 'votes', 'options');

const { PORT, CLIENT_URL, API_URL, TEST } = process.env;

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

app.set('trust proxy', true);
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000,
    message: {
      error: 'Too many requests from this IP, please try again in 15 minutes',
    },
    keyGenerator: (req) => {
      const ip = req.ip || 'unknown';
      const logMessage = `${new Date().toISOString()} - IP: ${ip}`;
      console.log(logMessage);
      return ip;
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(createPollRoute);
app.use(getPollRoute);
app.use(votePollRoute);

if (!TEST) {
  createTables(
    tableConfig.getTableConfig().pollTable,
    tableConfig.getTableConfig().voteTable,
    tableConfig.getTableConfig().optionsTable,
  );

  app.listen(PORT, async () => {
    console.log(`Server running at ${API_URL}`);
  });
}
