import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateSourceDto } from "src/modules/abstract/dtos";
import { CreateTimerangeDto } from "src/modules/abstract/dtos/timerange.dto";

export class CreatePlaceDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly address!: string;

  @ApiProperty({ type: Number })
  @IsInt()
  readonly seatsCount!: number;

  @ApiProperty({ type: CreateTimerangeDto, required: false })
  @ValidateNested()
  @Type(() => CreateTimerangeDto)
  readonly timerange!: CreateTimerangeDto;

  @ApiProperty({ type: CreateSourceDto, required: false })
  @ValidateNested()
  @Type(() => CreateSourceDto)
  readonly preview!: CreateSourceDto;
}
