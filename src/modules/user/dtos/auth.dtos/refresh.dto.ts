import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { IRefreshParams } from "../../application/services/auth.service";

export class RefreshDto implements IRefreshParams {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly refresh!: string;
}
