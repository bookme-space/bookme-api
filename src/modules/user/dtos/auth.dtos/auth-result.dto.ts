import { ApiProperty } from "@nestjs/swagger";

import { UnmarshalledUser } from "../../domain/entities";
import { UserDto } from "../user.dtos/user.dto";

export class UserAuthorizedResultDto {
  @ApiProperty({ type: String })
  readonly access!: string;

  @ApiProperty({ type: UserDto })
  readonly user!: UnmarshalledUser;
}
