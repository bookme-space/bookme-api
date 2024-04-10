import { ApiProperty } from "@nestjs/swagger";

import { EntityDto, ToApiEnum } from "@core/base.dtos";

import {
  TimeslotRange,
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
  readonly timerange!: TimeslotRange;
}
