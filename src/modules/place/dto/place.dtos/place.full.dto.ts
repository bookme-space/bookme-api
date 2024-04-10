import { ApiProperty } from "@nestjs/swagger";

import {
  UnmarshalledPlace,
  UnmarshalledSeat,
} from "../../domain/entities";
import { SeatFullDto } from "../seat.dtos/seat.full.dto";
import { PlaceDto } from "./place.dto";

export class PlaceFullDto
  extends PlaceDto
  implements UnmarshalledPlace
{
  @ApiProperty({ type: SeatFullDto })
  readonly seats!: UnmarshalledSeat[];
}
