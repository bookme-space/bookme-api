import { Entity, UnmarshalledEntity } from "@core/domain";
import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";
import {
  FindByIdOptions,
  FindOneOptions,
  FindOptions,
  IBaseRepository,
} from "@core/domain/abstract/base.repository";
import { DatabaseClient } from "@core/modules/database";
import { ModelName } from "@core/modules/database/repository/interfaces";

import { EmptyObject } from "@app.types/common";

export class BaseRepository<
  T extends Entity,
  M extends ModelName,
  Include extends Record<PropertyKey, unknown> = EmptyObject,
  Where extends Record<PropertyKey, unknown> = EmptyObject,
  Order extends Record<PropertyKey, unknown> = EmptyObject,
> implements IBaseRepository<T, Include, Where, Order>
{
  constructor(
    protected readonly model: M,
    protected readonly mapper: IBaseMapper<
      T,
      UnmarshalledEntity,
      Include,
      Where,
      Order
    >,
    protected readonly db: DatabaseClient,
  ) {}

  public async find(
    opts?: FindOptions<Include, Where, Order>,
  ): Promise<T[]> {
    const where = opts?.where && this.mapper.toWhere(opts.where);
    const orderBy =
      opts?.order && this.mapper.toOrder(opts.order);
    const include =
      opts?.include && this.mapper.toInclude(opts.include);

    return this.db
      .getRepository(this.model)
      .findMany({
        take: opts?.take ?? undefined,
        skip: opts?.skip ?? undefined,
        where,
        orderBy,
        include,
      } as any)
      .then((models) =>
        models.map((model) => this.mapper.toDomain(model)),
      );
  }

  public async findOne({
    include: _include,
    where: _where,
    order,
  }: FindOneOptions<Include, Where, Order>): Promise<T> {
    const where = this.mapper.toWhere(_where);
    const orderBy = order && this.mapper.toOrder(order);
    const include = _include && this.mapper.toInclude(_include);

    return this.db
      .getRepository(this.model)
      .findFirst({ where, orderBy, include } as any)
      .then((model) => this.mapper.toDomain(model));
  }

  public async findById({
    id,
    include: _include,
  }: FindByIdOptions<Include>): Promise<T> {
    const include = _include && this.mapper.toInclude(_include);

    return this.db
      .getRepository(this.model)
      .findUnique({ where: { id }, include } as any)
      .then((model) => this.mapper.toDomain(model));
  }

  public async save(entity: T): Promise<void> {
    await this.db.getRepository(this.model).upsert({
      where: { id: entity.Id },
      update: this.mapper.toPersistence(
        entity,
        PersistType.Update,
      ),
      create: this.mapper.toPersistence(
        entity,
        PersistType.Create,
      ),
    } as any);
  }
}
