import { EntityId, UnmarshalledEntity } from "@core/domain";

import { UnmarshalledPlace } from "../place/interfaces";
import { Place } from "../place/place.entity";

export type UserInclude = {};

export type UserWhere = {};

export type UserOrder = {};

export enum UserRole {
  User,
  Admin,
  Employee,
  PlaceOwner,
}

export interface Position {
  latitude: number;
  longitude: number;
}

export type UserEssentialProps = Readonly<
  Required<{
    role: UserRole;
    email: string;
    firstname: string;
    lastname: string;
  }>
>;

export type UserOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    birthdate: Date;
    password: string;
    nickname: string;
    position: Position;
    ownedPlaces: Place[];
  }>
>;

export type UserProps = UserEssentialProps & UserOptionalProps;

export interface UnmarshalledUser extends UnmarshalledEntity {
  readonly role: UserRole;
  readonly firsname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly birthdate: Date;
  readonly position: Position;
  readonly nickname: string;
  readonly ownedPlases?: UnmarshalledPlace[];
}
