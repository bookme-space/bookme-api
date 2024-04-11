import { Type } from "class-transformer";
import { IsDate } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { ITime, UnmarshalledTimerange } from "../values";
import { ITimeDto } from "./itime.dto";

export class TimerangeDto implements UnmarshalledTimerange {
  @ApiProperty({ type: ITimeDto })
  readonly start!: ITime;

  @ApiProperty({ type: ITimeDto })
  readonly end!: ITime;
}

export interface ICraeteTimerangeParams {
  readonly start: Date;
  readonly end: Date;
}

export class CreateTimerangeDto
  implements ICraeteTimerangeParams
{
  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  readonly start!: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  readonly end!: Date;
}
