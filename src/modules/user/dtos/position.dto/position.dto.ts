import { ApiProperty } from "@nestjs/swagger";

export class PositionDto {
  @ApiProperty({ type: Number, example: 53.181012 })
  readonly lat!: number;

  @ApiProperty({ type: Number, example: 45.003538 })
  readonly long!: number;
}
