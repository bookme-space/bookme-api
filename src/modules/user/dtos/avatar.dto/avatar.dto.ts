import { ApiProperty } from "@nestjs/swagger";

import { SourceDto } from "src/modules/abstract/dtos/source.dto";

export class AvatarDto extends SourceDto {
  @ApiProperty({ type: Date })
  readonly updatedAt!: Date;
}
