import { Entity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { Avatar } from "./avatar.value";
import { UserProps, UserRole } from "./interfaces";
import { Position } from "./position.value";

export class User extends Entity {
  private role: UserRole;
  private email: string;
  private firstname: string;
  private lastname: string;
  private birthdate: Nullable<Date>;
  private password: Nullable<string>;
  private nickname: Nullable<string>;
  private avatar: Nullable<Avatar>;
  private position: Nullable<Position>;

  constructor(props: UserProps) {
    super(props.id);
    this.role = props.role ?? UserRole.User;
    this.email = props.email;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.birthdate = props.birthdate ?? null;
    this.password = props.password ?? null;
    this.nickname = props.nickname ?? null;
    this.avatar = props.avatar ?? null;
    this.position = props.position ?? null;
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
  public get Birthdate(): Nullable<Date> {
    return this.birthdate;
  }
  public get Password(): Nullable<string> {
    return this.password;
  }
  public get Nickname(): Nullable<string> {
    return this.nickname;
  }
  public get Avatar(): Nullable<Avatar> {
    return this.avatar;
  }
  public get Position(): Nullable<Position> {
    return this.position;
  }

  public SetAvatar(avatar: Nullable<Avatar>): void {
    this.avatar = avatar;
  }

  public SetPosition(position: Nullable<Position>): void {
    this.position = position;
  }
}
