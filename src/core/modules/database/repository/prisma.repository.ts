/* eslint @typescript-eslint/ban-types: 0 */
import {
  IBasePrismaService,
  ModelArgs,
  ModelName,
  ModelResult,
  PrismaPureClient,
  SelectSubset,
  Subset,
} from "./interfaces";

export class PrismaRepository<T extends ModelName>
  implements IBasePrismaService<T>
{
  constructor(
    protected readonly model: T,
    protected readonly prisma: PrismaPureClient,
  ) {}

  protected get delegate(): PrismaPureClient[Uncapitalize<T>] {
    const model = (this.model.at(0)?.toLowerCase() +
      this.model.slice(1)) as Uncapitalize<T>;

    return this.prisma[model];
  }

  public findUnique<A extends ModelArgs<T, "findUniqueOrThrow">>(
    args?: SelectSubset<A, ModelArgs<T, "findUniqueOrThrow">>,
  ): ModelResult<T, A, "findUniqueOrThrow"> {
    return (this.delegate.findUniqueOrThrow as Function)(args);
  }

  public findFirst<A extends ModelArgs<T, "findFirstOrThrow">>(
    args?: SelectSubset<A, ModelArgs<T, "findFirstOrThrow">>,
  ): ModelResult<T, A, "findFirstOrThrow"> {
    return (this.delegate.findFirstOrThrow as Function)(args);
  }

  public findMany<A extends ModelArgs<T, "findMany">>(
    args?: SelectSubset<A, ModelArgs<T, "findMany">>,
  ): ModelResult<T, A, "findMany"> {
    return (this.delegate.findMany as Function)(args);
  }

  public create<A extends ModelArgs<T, "create">>(
    args: SelectSubset<A, ModelArgs<T, "create">>,
  ): ModelResult<T, A, "create"> {
    return (this.delegate.create as Function)(args);
  }

  public createMany<A extends ModelArgs<T, "createMany">>(
    args?: SelectSubset<A, ModelArgs<T, "createMany">>,
  ): ModelResult<T, A, "createMany"> {
    return (this.delegate.createMany as Function)(args);
  }

  public update<A extends ModelArgs<T, "update">>(
    args: SelectSubset<A, ModelArgs<T, "update">>,
  ): ModelResult<T, A, "update"> {
    return (this.delegate.update as Function)(args);
  }

  public updateMany<A extends ModelArgs<T, "updateMany">>(
    args: SelectSubset<A, ModelArgs<T, "updateMany">>,
  ): ModelResult<T, A, "updateMany"> {
    return (this.delegate.updateMany as Function)(args);
  }

  public delete<A extends ModelArgs<T, "delete">>(
    args: SelectSubset<A, ModelArgs<T, "delete">>,
  ): ModelResult<T, A, "delete"> {
    return (this.delegate.delete as Function)(args);
  }

  public deleteMany<A extends ModelArgs<T, "deleteMany">>(
    args?: SelectSubset<A, ModelArgs<T, "deleteMany">>,
  ): ModelResult<T, A, "deleteMany"> {
    return (this.delegate.deleteMany as Function)(args);
  }

  public upsert<A extends ModelArgs<T, "upsert">>(
    args: SelectSubset<A, ModelArgs<T, "upsert">>,
  ): ModelResult<T, A, "upsert"> {
    return (this.delegate.upsert as Function)(args);
  }

  public count<A extends ModelArgs<T, "count">>(
    args?: Subset<A, ModelArgs<T, "count">>,
  ): ModelResult<T, A, "count"> {
    return (this.delegate.count as Function)(args);
  }

  public aggregate<A extends ModelArgs<T, "aggregate">>(
    args: Subset<A, ModelArgs<T, "aggregate">>,
  ): ModelResult<T, A, "aggregate"> {
    return (this.delegate.aggregate as Function)(args);
  }
}
