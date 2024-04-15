import { Entity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { Avatar } from "./avatar.value";
import { TenantProps } from "./interfaces";

export class Tenant extends Entity {
  private readonly email: string;
  private readonly firstname: string;
  private readonly lastname: string;
  private readonly nickname: Nullable<string>;
  private readonly avatar: Nullable<Avatar>;

  constructor(props: TenantProps) {
    super(props.id);
    this.email = props.email;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.nickname = props.nickname ?? null;
    this.avatar = props.avatar ?? null;
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
  public get Nickname(): Nullable<string> {
    return this.nickname;
  }
  public get Avatar(): Nullable<Avatar> {
    return this.avatar;
  }
}
