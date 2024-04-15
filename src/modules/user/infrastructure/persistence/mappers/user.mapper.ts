import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";

import { SourceType } from "src/modules/abstract/values";
import { Avatar } from "src/modules/user/domain/entities/user/avatar.value";
import {
  UnmarshalledUser,
  UserInclude,
  UserOrder,
  UserRole,
  UserWhere,
} from "src/modules/user/domain/entities/user/interfaces";
import { Position } from "src/modules/user/domain/entities/user/position.value";
import { User } from "src/modules/user/domain/entities/user/user.entity";
import { UserFactory } from "src/modules/user/domain/factories/user.factory";

type IUserPersistenceUpsert = {
  [PersistType.Create]: Prisma.UserCreateInput;
  [PersistType.Update]: Prisma.UserUpdateInput;
};

type IUserPersistenceInclude = Prisma.UserInclude;

type IUserPersistenceWhere = Prisma.UserWhereInput;

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

  public override toInclude(
    include: UserInclude,
  ): IUserPersistenceInclude {
    return include;
  }
  public override toWhere(
    where: UserWhere,
  ): IUserPersistenceWhere {
    return where;
  }
  public override toOrder(_: UserOrder): unknown {
    throw new Error("Method not implemented.");
  }

  public override toDomain(raw: any): User {
    return this.factory.create({
      id: raw.id,
      role: UserRole[raw.role] as any,
      email: raw.email,
      firstname: raw.firstname,
      lastname: raw.lastname,
      birthdate: new Date(raw.birthdate),
      password: raw.password,
      nickname: raw.nickname,
      ...(raw.avUpdated &&
        raw.avSrcType &&
        raw.avOriginal &&
        raw.avThumbnail && {
          avatar: new Avatar(
            SourceType[raw.avSrcType] as any,
            raw.avOriginal,
            raw.avThumbnail,
            raw.avUpdated,
          ),
        }),
      ...(raw.lat &&
        raw.long && {
          position: new Position(raw.lat, raw.long),
        }),
    });
  }
  public override toPersistence<T extends PersistType>(
    entity: User,
    _?: T,
  ): IUserPersistenceUpsert[T] {
    return {
      id: entity.Id,
      role: UserRole[entity.Role] as any,
      email: entity.Email,
      firstname: entity.Firstname,
      lastname: entity.Lastname,
      birthdate: entity.Birthdate,
      password: entity.Password,
      nickname: entity.Nickname,
      ...(entity.Avatar && {
        avUpdated: entity.Avatar.UpdatedAt,
        avSrcType: SourceType[entity.Avatar.Type] as any,
        avOriginal: entity.Avatar.Original,
        avThumbnail: entity.Avatar.Thumbnail,
      }),
      ...(entity.Position && {
        lat: entity.Position.Lat,
        long: entity.Position.Long,
      }),
    };
  }

  public override toDto(entity: User): UnmarshalledUser {
    return {
      id: entity.Id,
      role: UserRole[entity.Role] as keyof typeof UserRole,
      email: entity.Email,
      firstname: entity.Firstname,
      lastname: entity.Lastname,
      birthdate: entity.Birthdate,
      nickname: entity.Nickname,
      avatar: entity.Avatar,
      position: entity.Position,
    };
  }
}
