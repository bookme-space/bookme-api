import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { schema } from '../../../database/schema';
import { DATABASE_CONNECTION_KEY } from './database.decorator';
import { DatabaseService } from './database.service';

interface DatabaseModuleOptions {
  isGlobal?: boolean;
}

export class DatabaseModule {
  static forRoot(options?: DatabaseModuleOptions) {
    return {
      module: DatabaseModule,
      global: options?.isGlobal ?? false,
      providers: [
        DatabaseService,
        {
          provide: DATABASE_CONNECTION_KEY,
          inject: [DatabaseService],
          useFactory: async (
            databaseService: DatabaseService,
          ): Promise<NodePgDatabase<typeof schema>> =>
            databaseService.DB,
        },
      ],
      exports: [DATABASE_CONNECTION_KEY],
    };
  }
}
