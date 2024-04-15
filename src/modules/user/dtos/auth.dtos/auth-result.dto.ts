import { ApiProperty } from "@nestjs/swagger";

import { UnmarshalledUser } from "../../domain/entities";
import { UserDto } from "../user.dtos/user.dto";

export class UserAuthorizedResultDto {
  @ApiProperty({ type: String })
  readonly access!: string;

  @ApiProperty({ type: String })
  readonly refresh!: string;

  @ApiProperty({ type: Number })
  readonly accessExp!: number;

  @ApiProperty({ type: Number })
  readonly refreshExp!: number;

  @ApiProperty({ type: UserDto })
  readonly user!: UnmarshalledUser;
}
