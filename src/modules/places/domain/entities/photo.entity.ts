interface Sources {
  main: string;
  preview: string;
}

export class PhotoEntity {
  private readonly id: bigint;
  private readonly createdAt: Date;
  private readonly order: number;
  private readonly sources: Sources;

  constructor(id: bigint, createdAt: Date, order: number, sources: Sources) {
    this.id = id;
    this.createdAt = createdAt;
    this.order = order;
    this.sources = sources;
  }
  public get Id(): bigint {
    return this.id;
  }
  public get CreatedAt(): Date {
    return this.createdAt;
  }
  public get Order(): number {
    return this.order;
  }
  public get Sources(): Sources {
    return this.sources;
  }
}
