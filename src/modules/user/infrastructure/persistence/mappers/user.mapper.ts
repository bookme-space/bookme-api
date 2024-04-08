import { Injectable } from "@nestjs/common";

import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";

import { User } from "src/modules/user/domain/entities/user/user.entity";
import {
  UnmarshalledUser,
  UserInclude,
  UserOrder,
  UserWhere,
} from "src/modules/user/domain/entities/user/user.interfaces";
import { UserFactory } from "src/modules/user/domain/factories/user.factory";

@Injectable()
export class UserMapper extends IBaseMapper<
  User,
  UnmarshalledUser,
  UserInclude,
  UserWhere,
  UserOrder
> {
  constructor(private readonly factory: UserFactory) {
    super();
  }
  public override toInclude(include: UserInclude): unknown {
    return include;
  }
  public override toWhere(where: UserWhere): unknown {
    return where;
  }
  public override toOrder(order: UserOrder): unknown {
    return order;
  }
  public override toDomain(_raw: any): any {
    return "in development";
  }

  public override toPersistence<T extends PersistType>(
    _entity: User,
    _type?: T,
  ): string {
    return "in development";
  }

  public override toDto(_entity: User): any {
    return "in development";
  }
}
