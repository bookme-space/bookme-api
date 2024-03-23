import { Pool } from 'pg';
import * as process from 'process';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const creds = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(creds);

const db = drizzle(pool);

async function main() {
  console.log('migration started...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('migration ended...');
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
