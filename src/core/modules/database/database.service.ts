import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { RootConfig } from "@core/config";

import { ModelName } from "./repository/interfaces";
import { PrismaRepository } from "./repository/prisma.repository";
import { ExtendedClient } from "./transactional/client";

@Injectable()
export class DatabaseClient
  extends ExtendedClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService<RootConfig, true>) {
    const { dbUrl } = config.get("app", { infer: true });
    super({ datasourceUrl: dbUrl });
  }

  public getRepository<T extends ModelName>(
    model: T,
  ): PrismaRepository<T> {
    return new PrismaRepository<T>(model, this);
  }

  public async onModuleInit() {
    await this.$connect();
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}
