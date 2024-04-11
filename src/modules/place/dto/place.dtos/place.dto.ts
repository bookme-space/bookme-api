import { ApiProperty } from "@nestjs/swagger";

import { EntityDto } from "@core/base.dtos";

import { Nullable } from "@app.types/common";

import { SourceDto } from "src/modules/abstract/dtos";
import { TimerangeDto } from "src/modules/abstract/dtos/timerange.dto";
import { UnmarshalledTimerange } from "src/modules/abstract/values";

import {
  PlacePreview,
  UnmarshalledPlace,
} from "../../domain/entities";

export class PlaceDto
  extends EntityDto
  implements UnmarshalledPlace
{
  @ApiProperty({ type: String })
  readonly name!: string;

  @ApiProperty({ type: String })
  readonly description!: string;

  @ApiProperty({ type: String })
  readonly address!: string;

  @ApiProperty({ type: TimerangeDto })
  readonly timerange!: UnmarshalledTimerange;

  @ApiProperty({ type: SourceDto })
  readonly preview!: Nullable<PlacePreview>;
}
