import { DomainError } from "../../throwable";
import { Media } from "../media/media.entity";
import {
  IReorderMedia,
  IReorderedMedia,
  OrderableMediaProperties,
} from "./interfaces";

export class OrderableMedia extends Media {
  private order: number;

  constructor(properties: OrderableMediaProperties) {
    super(properties);
    this.order = properties.order;
  }

  public get Order(): number {
    return this.order;
  }
  public set Order(value: number) {
    this.order = value;
  }

  public static GetMaxOrder<T extends OrderableMedia>(
    entities: T[],
  ): number {
    return entities.length > 0
      ? Math.max(...entities.map(({ Order }) => Order))
      : 0;
  }

  public static Reorder<T extends OrderableMedia>(
    entities: T[],
    list: IReorderMedia[],
  ): IReorderedMedia<T>[] {
    const isUnique =
      new Set(list.map(({ order }) => order)).size ==
        list.length &&
      new Set(list.map(({ id }) => id)).size == list.length;

    const isCollision = list.some(({ id, order }) =>
      entities.find(
        ({ Id, Order }) => id != Id && order == Order,
      ),
    );

    if (!isUnique || isCollision)
      throw new DomainError("Cannot set same order");

    return list
      .map(({ id, order }) => ({
        entity: entities.find(({ Id }) => Id == id),
        order,
      }))
      .filter(
        (x): x is IReorderedMedia<T> =>
          !Object.is(x.entity, undefined),
      );
  }
}
