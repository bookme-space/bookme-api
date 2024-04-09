import { Injectable } from "@nestjs/common";

import { IBaseMapper } from "@core/domain/abstract/base.mapper";

import { SourceType } from "src/modules/abstract/values";
import {
  Avatar,
  Tenant,
  UnmarshalledTenant,
} from "src/modules/place/domain/entities";
import { TenantFactory } from "src/modules/place/domain/factories/tenant.factory";

@Injectable()
export class TenantMapper extends IBaseMapper<
  Tenant,
  UnmarshalledTenant
> {
  constructor(private readonly factory: TenantFactory) {
    super();
  }

  public override toInclude(): unknown {
    throw new Error("Method not implemented.");
  }
  public override toWhere(): unknown {
    throw new Error("Method not implemented.");
  }
  public override toOrder(): unknown {
    throw new Error("Method not implemented.");
  }

  public override toDomain(raw: any): Tenant {
    return this.factory.create({
      id: raw.id,
      email: raw.email,
      firstname: raw.firstname,
      lastname: raw.lastname,
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
    });
  }

  public override toPersistence(): unknown {
    throw new Error("Method not implemented.");
  }

  public override toDto(entity: Tenant): UnmarshalledTenant {
    return {
      id: entity.Id,
      email: entity.Email,
      firstname: entity.Firstname,
      lastname: entity.Lastname,
      nickname: entity.Nickname,
      avatar: entity.Avatar,
    };
  }
}
