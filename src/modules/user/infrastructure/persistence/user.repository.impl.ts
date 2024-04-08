import { BaseRepository } from "@core/infrastructure/persistence/base.repository.impl";
import { DatabaseClient } from "@core/modules/database";

import {
  User,
  UserInclude,
  UserOrder,
  UserWhere,
} from "../../domain/entities";
import { IUserRepository } from "../../domain/user.repository";
import { UserMapper } from "./mappers/user.mapper";

export class UserRepositoryImpl
  extends BaseRepository<
    User,
    "User",
    UserInclude,
    UserWhere,
    UserOrder
  >
  implements IUserRepository
{
  constructor(mapper: UserMapper, db: DatabaseClient) {
    super("User", mapper, db);
  }
}
