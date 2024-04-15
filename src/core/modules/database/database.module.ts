import { DynamicModule } from "@nestjs/common";

import { DatabaseClient } from "./database.service";

export interface DatabaseModuleConfig {
  isGlobal?: boolean;
}

export class DatabaseModule {
  public static register(
    config?: DatabaseModuleConfig,
  ): DynamicModule {
    const isGlobal = config?.isGlobal ?? false;
    const providers = [DatabaseClient];

    return {
      module: DatabaseModule,
      global: isGlobal,
      providers,
      exports: [...providers],
    };
  }
}
