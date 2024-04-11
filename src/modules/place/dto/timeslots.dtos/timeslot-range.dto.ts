import { ToApiEnum } from "@swagger/api.properties";

import { ApiProperty } from "@nestjs/swagger";

import { TimerangeDto } from "src/modules/abstract/dtos/timerange.dto";

import { DayOfWeek } from "../../domain/entities";

export class TimeslotRangeDto extends TimerangeDto {
  @ApiProperty({ enum: ToApiEnum(DayOfWeek) })
  readonly day!: keyof DayOfWeek;
}
