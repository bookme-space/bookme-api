import { ToApiEnum } from "@swagger/api.properties";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { SourceType, UnmarshalledSource } from "../values";

export class SourceDto implements UnmarshalledSource {
  @ApiProperty({ enum: ToApiEnum(SourceType) })
  readonly type!: keyof typeof SourceType;

  @ApiProperty({ type: String })
  readonly original!: string;

  @ApiProperty({ type: String })
  readonly thumbnail!: string;
}

export interface ICreateSourceParms {
  readonly type: SourceType;
  readonly original: string;
  readonly thumbnail: string;
}

export class CreateSourceDto implements ICreateSourceParms {
  @ApiProperty({ enum: ToApiEnum(SourceType), required: false })
  @IsOptional()
  @IsEnum(SourceType)
  @Transform(({ value }) => SourceType[value])
  readonly type!: SourceType;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly original!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly thumbnail!: string;
}
