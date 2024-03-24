import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';

import { Injectable } from '@nestjs/common';

import { schema } from 'src/database/schema';

const creds = {
  connectionString:
    'postgres://postgres:postgres@localhost:5432/test',
};

@Injectable()
export class DatabaseService {
  private db!: NodePgDatabase<typeof schema>;

  constructor() {
    this.initDB();
  }

  private initDB() {
    const pool = new Pool(creds);
    this.db = drizzle(pool);
  }

  public get DB() {
    return this.db;
  }
}
