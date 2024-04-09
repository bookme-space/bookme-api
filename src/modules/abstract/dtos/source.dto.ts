import { ApiProperty } from "@nestjs/swagger";

import { ToApiEnum } from "@core/base.dtos";

import { SourceType, UnmarshalledSource } from "../values";

export class SourceDto implements UnmarshalledSource {
  @ApiProperty({ enum: ToApiEnum(SourceType) })
  readonly type!: keyof typeof SourceType;

  @ApiProperty({ type: String })
  readonly original!: string;

  @ApiProperty({ type: String })
  readonly thumbnail!: string;
}
