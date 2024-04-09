import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { Avatar } from "./avatar.value";

export type TenantEssentialProps = Readonly<
  Required<{
    email: string;
    firstname: string;
    lastname: string;
  }>
>;

export type TenantOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    nickname: string;
    avatar: Avatar;
  }>
>;

export type TenantProps = TenantEssentialProps &
  TenantOptionalProps;

export interface UnmarshalledTenant extends UnmarshalledEntity {
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly nickname: Nullable<string>;
  readonly avatar: Nullable<Avatar>;
}
