import { Module } from "@nestjs/common";

import { DatabaseClient } from "@core/modules/database";

import { UserFactory } from "./domain/factories/user.factory";
import { IUserRepository } from "./domain/user.repository";
import { UserMapper } from "./infrastructure/persistence/mappers/user.mapper";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";

const infrastructure = [
  UserMapper,
  {
    provide: IUserRepository,
    useFactory: (mapper: UserMapper, db: DatabaseClient) =>
      new UserRepositoryImpl(mapper, db),
    inject: [UserMapper, DatabaseClient],
  },
];

const domain = [UserFactory];

@Module({
  providers: [...infrastructure, ...domain],
  exports: [IUserRepository],
})
export class UserModule {}
