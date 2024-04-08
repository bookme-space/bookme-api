import { IBaseRepository } from "@core/domain/abstract/base.repository";

import {
  UserInclude,
  UserOrder,
  UserWhere,
} from "./entities/user/interfaces";
import { User } from "./entities/user/user.entity";

export abstract class IUserRepository extends IBaseRepository<
  User,
  UserInclude,
  UserWhere,
  UserOrder
> {}
