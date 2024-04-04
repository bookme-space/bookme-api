/* eslint @typescript-eslint/no-explicit-any: 0 */
import { EmptyObject } from "@app.types/common";

import { Entity } from "../entities/domain.entity";
import { UnmarshalledEntity } from "../entities/interfaces";

export enum PersistType {
  Create,
  Update,
}

export abstract class IBaseMapper<
  T extends Entity,
  Dto extends UnmarshalledEntity,
  Include extends Record<PropertyKey, unknown> = EmptyObject,
  Where extends Record<PropertyKey, unknown> = EmptyObject,
  Order extends Record<PropertyKey, unknown> = EmptyObject,
  Raw extends Record<PropertyKey, unknown> = any,
> {
  public abstract toInclude(include: Include): unknown;
  public abstract toWhere(where: Where): unknown;
  public abstract toOrder(order: Order): unknown;

  public abstract toDomain(raw: Raw): T;
  public abstract toPersistence(
    entity: T,
    type?: PersistType,
  ): any;
  public abstract toDto(entity: T): Dto;
}
