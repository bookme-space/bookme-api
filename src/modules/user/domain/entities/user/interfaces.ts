import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { Avatar } from "./avatar.value";
import { Position } from "./position.value";

export type UserInclude = {};

export type UserWhere = {};

export type UserOrder = {};

export enum UserRole {
  User,
  Admin,
  Employee,
  PlaceOwner,
}

export type UserEssentialProps = Readonly<
  Required<{
    email: string;
    firstname: string;
    lastname: string;
  }>
>;

export type UserOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    role: UserRole;
    birthdate: Date;
    password: string;
    nickname: string;
    avatar: Avatar;
    position: Position;
  }>
>;

export type UserProps = UserEssentialProps & UserOptionalProps;

export interface UnmarshalledUser extends UnmarshalledEntity {
  readonly role: keyof typeof UserRole;
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly birthdate: Nullable<Date>;
  readonly nickname: Nullable<string>;
  readonly avatar: Nullable<Avatar>;
  readonly position: Nullable<Position>;
}
