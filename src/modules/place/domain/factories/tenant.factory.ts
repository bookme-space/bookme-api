import { Injectable } from "@nestjs/common";

import { User } from "src/modules/user/domain/entities";

import { Avatar, Tenant, TenantProps } from "../entities";

@Injectable()
export class TenantFactory {
  public create(props: TenantProps): Tenant {
    return new Tenant(props);
  }

  public fromUser(user: User): Tenant {
    return new Tenant({
      id: user.Id,
      email: user.Email,
      firstname: user.Firstname,
      lastname: user.Lastname,
      nickname: user.Nickname ?? undefined,
      ...(user.Avatar && {
        avatar: new Avatar(
          user.Avatar.Type,
          user.Avatar.Original,
          user.Avatar.Thumbnail,
          user.Avatar.UpdatedAt,
        ),
      }),
    });
  }
}
