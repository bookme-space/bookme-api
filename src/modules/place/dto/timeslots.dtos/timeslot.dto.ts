import { DayOfWeek } from "@prisma/client";
import { ToApiEnum } from "@swagger/api.properties";

import { ApiProperty } from "@nestjs/swagger";

import { EntityDto } from "@core/base.dtos";

import { UnmarshalledTimerange } from "src/modules/abstract/values";

import {
  TimeslotStatus,
  UnmarshalledTimeslot,
} from "../../domain/entities";
import { TimeslotRangeDto } from "./timeslot-range.dto";

export class TimeslotDto
  extends EntityDto
  implements UnmarshalledTimeslot
{
  @ApiProperty({ enum: ToApiEnum(TimeslotStatus) })
  readonly status!: keyof typeof TimeslotStatus;

  @ApiProperty({ type: TimeslotRangeDto })
  readonly timerange!: UnmarshalledTimerange & {
    day: keyof typeof DayOfWeek;
  };
}
