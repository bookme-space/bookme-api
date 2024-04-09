import { ApiProperty } from "@nestjs/swagger";

import { EntityId, UnmarshalledEntity } from "@core/domain";

export class EntityDto implements UnmarshalledEntity {
  @ApiProperty({
    type: String,
    example: "3d7b43bb-15aa-4f10-bd4e-b0cefbd90110",
  })
  readonly id!: EntityId;
}
