import { BaseRepository } from "@core/infrastructure/persistence/base.repository.impl";
import { DatabaseClient } from "@core/modules/database";

import {
  User,
  UserInclude,
  UserOrder,
  UserWhere,
} from "../../domain/entities";
import {
  FindByEmailOptions,
  IUserRepository,
} from "../../domain/user.repository";
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
  constructor(
    override mapper: UserMapper,
    db: DatabaseClient,
  ) {
    super("User", mapper, db);
  }

  public async findByEmail({
    email,
    include: _include,
  }: FindByEmailOptions<UserInclude>): Promise<User> {
    const include = _include && this.mapper.toInclude(_include);

    return this.db
      .getRepository("User")
      .findUnique({ where: { email }, include })
      .then((row) => this.mapper.toDomain(row));
  }
}
