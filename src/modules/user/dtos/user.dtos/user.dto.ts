import { UserRole } from "@prisma/client";
import { ToApiEnum } from "@swagger/api.properties";

import { ApiProperty } from "@nestjs/swagger";

import { EntityDto } from "@core/base.dtos";

import { Nullable } from "@app.types/common";

import {
  Avatar,
  Position,
  UnmarshalledUser,
} from "../../domain/entities";
import { AvatarDto } from "../avatar.dto/avatar.dto";
import { PositionDto } from "../position.dto/position.dto";

export class UserDto
  extends EntityDto
  implements UnmarshalledUser
{
  @ApiProperty({ enum: ToApiEnum(UserRole) })
  readonly role!: UserRole;

  @ApiProperty({ type: String })
  readonly email!: string;

  @ApiProperty({ type: String })
  readonly firstname!: string;

  @ApiProperty({ type: String })
  readonly lastname!: string;

  @ApiProperty({ type: Date, nullable: true })
  readonly birthdate!: Nullable<Date>;

  @ApiProperty({ type: String, nullable: true })
  readonly nickname!: Nullable<string>;

  @ApiProperty({ type: PositionDto, nullable: true })
  readonly position!: Nullable<Position>;

  @ApiProperty({ type: AvatarDto, nullable: true })
  readonly avatar!: Nullable<Avatar>;
}
