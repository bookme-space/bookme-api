import { ApiProperty } from "@nestjs/swagger";

import { ITime, UnmarshalledTimerange } from "../values";
import { ITimeDto } from "./itime.dto";

export class TimerangeDto implements UnmarshalledTimerange {
  @ApiProperty({ type: ITimeDto })
  readonly start!: ITime;

  @ApiProperty({ type: ITimeDto })
  readonly end!: ITime;
}
