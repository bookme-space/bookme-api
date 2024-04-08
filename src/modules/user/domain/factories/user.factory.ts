import { Injectable } from "@nestjs/common";

import { User } from "../entities/user/user.entity";
import { UserProps } from "../entities/user/user.interfaces";

@Injectable()
export class UserFactory {
  public create(props: UserProps): User {
    return new User(props);
  }
}
