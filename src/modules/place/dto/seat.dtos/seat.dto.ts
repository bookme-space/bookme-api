import { ApiProperty } from "@nestjs/swagger";

import { EntityDto } from "@core/base.dtos";

import { Nullable } from "@app.types/common";

import { UnmarshalledSeat } from "../../domain/entities";

export class SeatDto
  extends EntityDto
  implements UnmarshalledSeat
{
  @ApiProperty({ type: String, nullable: true })
  readonly name!: Nullable<string>;

  @ApiProperty({ type: Number })
  readonly capacity!: number;
}
