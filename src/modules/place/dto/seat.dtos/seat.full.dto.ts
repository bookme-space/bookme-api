import { ApiProperty } from "@nestjs/swagger";

import {
  UnmarshalledSeat,
  UnmarshalledTimeslot,
} from "../../domain/entities";
import { TimeslotDto } from "../timeslots.dtos/timeslot.dto";
import { SeatDto } from "./seat.dto";

export class SeatFullDto
  extends SeatDto
  implements UnmarshalledSeat
{
  @ApiProperty({ type: TimeslotDto })
  timeslots!: UnmarshalledTimeslot[];
}
