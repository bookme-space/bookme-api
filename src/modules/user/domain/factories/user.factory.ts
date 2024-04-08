import { Injectable } from "@nestjs/common";

import { UserProps } from "../entities/user/interfaces";
import { User } from "../entities/user/user.entity";

@Injectable()
export class UserFactory {
  public create(props: UserProps): User {
    return new User(props);
  }
}
