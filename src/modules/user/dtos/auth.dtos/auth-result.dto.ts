import { ApiProperty } from "@nestjs/swagger";

import { UnmarshalledUser } from "../../domain/entities";
import { UserDto } from "../user.dtos/user.dto";

export class TokenDataDto {
  @ApiProperty({ type: String })
  readonly access!: string;

  @ApiProperty({ type: String })
  readonly refresh!: string;

  @ApiProperty({ type: Number })
  readonly exp!: number;
}

export class UserAuthorizedResultDto {
  @ApiProperty({ type: TokenDataDto })
  readonly tokenData!: TokenDataDto;

  @ApiProperty({ type: UserDto })
  readonly user!: UnmarshalledUser;
}
