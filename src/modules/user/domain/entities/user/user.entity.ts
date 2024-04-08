import { Entity } from "@core/domain";

import { Optional } from "@app.types/common";

import { DomainError } from "src/modules/abstract/throwable";

import { Place } from "../place/place.entity";
import {
  Position,
  UserProps,
  UserRole,
} from "./user.interfaces";

export class User extends Entity {
  private role: UserRole;
  private email: string;
  private firstname: string;
  private lastname: string;
  private birthdate?: Date;
  private password?: string;
  private nickname?: string;
  private position?: Position;
  private ownedPlaces?: Place[];

  constructor(props: UserProps) {
    super(props.id);
    this.role = props.role;
    this.email = props.email;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.password = props.password;
    this.nickname = props.nickname;
    this.position = props.position;
    this.ownedPlaces = props.ownedPlaces;
  }
  public get Role(): UserRole {
    return this.role;
  }
  public get Email(): string {
    return this.email;
  }
  public get Firstname(): string {
    return this.firstname;
  }
  public get Lastname(): string {
    return this.lastname;
  }
  public get Birthdate(): Optional<Date> {
    return this.birthdate;
  }
  public get Password(): Optional<string> {
    return this.password;
  }
  public get Nickname(): Optional<string> {
    return this.nickname;
  }
  public get Position(): Optional<Position> {
    return this.position;
  }
  public get OwnedPlaces(): Optional<Place[]> {
    return this.ownedPlaces;
  }
  public get IsPlacesDefined(): boolean {
    return !Object.is(this.ownedPlaces, undefined);
  }
  public get OwnedPlace(): Place[] {
    if (!this.IsPlacesDefined)
      throw new DomainError("Failed to get User.OwnedPlaces");
    return this.ownedPlaces!;
  }
  private set OwnedPlaces(value: Place[]) {
    if (!this.IsPlacesDefined)
      throw new DomainError("Failed to set User.OwnedPlaces");
    this.ownedPlaces = value;
  }

  public AddOwnedPlaces(value: Place): void {
    this.OwnedPlace.push(value);
  }
}

//book placeId -> seetId -> timeslot ->  status : Book
//owner exdents user + ownedPlaces
