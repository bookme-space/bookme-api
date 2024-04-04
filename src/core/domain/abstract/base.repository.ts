import { Entity, EntityId } from "@core/domain";

import { EmptyObject } from "@app.types/common";

export interface FindOptions<
  Include extends Record<PropertyKey, unknown>,
  Where extends Record<PropertyKey, unknown>,
  Order extends Record<PropertyKey, unknown>,
> {
  take?: number;
  skip?: number;
  where?: Where;
  order?: Order;
  include?: Include;
}

export interface FindOneOptions<
  Include extends Record<PropertyKey, unknown>,
  Where extends Record<PropertyKey, unknown>,
  Order extends Record<PropertyKey, unknown>,
> {
  where: Where;
  order?: Order;
  include?: Include;
}

export interface FindByIdOptions<
  Include extends Record<PropertyKey, unknown>,
> {
  id: EntityId;
  include?: Include;
}

export abstract class IBaseRepository<
  T extends Entity,
  Include extends Record<PropertyKey, unknown> = EmptyObject,
  Where extends Record<PropertyKey, unknown> = EmptyObject,
  Order extends Record<PropertyKey, unknown> = EmptyObject,
> {
  public abstract find(
    opts?: FindOptions<Include, Where, Order>,
  ): Promise<T[]>;

  public abstract findOne(
    options: FindOneOptions<Include, Where, Order>,
  ): Promise<T>;

  public abstract findById(
    opts: FindByIdOptions<Include>,
  ): Promise<T>;

  public abstract save(entity: T): Promise<void>;
}
