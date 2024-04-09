import { ApiProperty } from "@nestjs/swagger";

import { ITime } from "../values";

export class ITimeDto implements ITime {
  @ApiProperty({ type: Number, description: "Timestamp" })
  readonly timestamp!: number;

  @ApiProperty({
    type: Number,
    description: "Hours value (UTC)",
  })
  readonly hours!: number;

  @ApiProperty({
    type: Number,
    description: "Minutes value (UTC)",
  })
  readonly minutes!: number;
}
