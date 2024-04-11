import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PagingQueryDto {
  @ApiProperty({ type: Number, required: false, default: 10 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly take: number = 10;

  @ApiProperty({ type: Number, required: false, default: 0 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly skip: number = 0;
}
