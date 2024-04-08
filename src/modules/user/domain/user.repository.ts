import { IBaseRepository } from "@core/domain/abstract/base.repository";

import { User } from "./entities/user/user.entity";
import {
  UserInclude,
  UserOrder,
  UserWhere,
} from "./entities/user/user.interfaces";

export abstract class IUserRepository extends IBaseRepository<
  User,
  UserInclude,
  UserWhere,
  UserOrder
> {}
