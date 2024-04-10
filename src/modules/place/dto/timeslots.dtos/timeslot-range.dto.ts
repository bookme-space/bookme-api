import { ApiProperty } from "@nestjs/swagger";

import { ToApiEnum } from "@core/base.dtos";

import { TimerangeDto } from "src/modules/abstract/dtos/timerange.dto";

import { DayOfWeek } from "../../domain/entities";

export class TimeslotRangeDto extends TimerangeDto {
  @ApiProperty({ enum: ToApiEnum(DayOfWeek) })
  readonly day!: keyof DayOfWeek;
}
