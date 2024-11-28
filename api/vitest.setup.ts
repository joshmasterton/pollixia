import { afterEach, beforeAll, beforeEach } from 'vitest';
import { waitForDatabase } from './src/database/database';
import { createTables, dropTables } from './src/database/tables.database';
import { tableConfig } from './src/app';
import crypto from 'crypto';

beforeAll(async () => {
  await waitForDatabase();
});

beforeEach(async () => {
  tableConfig.updateTableConfig(
    `test_polls_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`,
  );
  await createTables(tableConfig.getTableConfig().pollTable);
});

afterEach(async () => {
  await dropTables(tableConfig.getTableConfig().pollTable);
});
