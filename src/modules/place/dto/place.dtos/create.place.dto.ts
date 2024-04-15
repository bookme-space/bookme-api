import { Type } from "class-transformer";
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateSourceDto } from "src/modules/abstract/dtos";
import { CreateTimerangeDto } from "src/modules/abstract/dtos/timerange.dto";

import { ICreatePlaceParams } from "../../application/services/place.service";

export class CreatePlaceDto implements ICreatePlaceParams {
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

  @ApiProperty({ type: CreateTimerangeDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateTimerangeDto)
  readonly timerange!: CreateTimerangeDto;

  @ApiProperty({ type: CreateSourceDto, required: false })
  @ValidateNested()
  @Type(() => CreateSourceDto)
  readonly preview?: CreateSourceDto;
}
