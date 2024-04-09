import { IBaseRepository } from "@core/domain/abstract/base.repository";

import {
  UserInclude,
  UserOrder,
  UserWhere,
} from "./entities/user/interfaces";
import { User } from "./entities/user/user.entity";

export interface FindByEmailOptions<
  Include extends Record<PropertyKey, unknown>,
> {
  email: string;
  include?: Include;
}

export abstract class IUserRepository extends IBaseRepository<
  User,
  UserInclude,
  UserWhere,
  UserOrder
> {
  public abstract findByEmail(
    opts: FindByEmailOptions<UserInclude>,
  ): Promise<User>;
}
