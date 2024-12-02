import { afterEach, beforeAll, beforeEach } from 'vitest';
import { waitForDatabase } from './src/database/database';
import { createTables, dropTables } from './src/database/tables.database';
import { tableConfig } from './src/app';
import crypto from 'crypto';

beforeAll(async () => {
  await waitForDatabase();
});

beforeEach(async () => {
  tableConfig.updatePollTableConfig(
    `test_polls_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`,
  );

  tableConfig.updateVoteTableConfig(
    `test_votes_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`,
  );

  tableConfig.updateOptionsTableConfig(
    `test_options_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`,
  );

  await createTables(
    tableConfig.getTableConfig().pollTable,
    tableConfig.getTableConfig().voteTable,
    tableConfig.getTableConfig().optionsTable,
  );
});

afterEach(async () => {
  await dropTables(
    tableConfig.getTableConfig().pollTable,
    tableConfig.getTableConfig().voteTable,
    tableConfig.getTableConfig().optionsTable,
  );
});
