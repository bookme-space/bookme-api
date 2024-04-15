import { Source, SourceType } from "src/modules/abstract/values";

export class Avatar extends Source {
  private readonly updatedAt: Date;

  constructor(
    type: SourceType,
    original: string,
    thumbnail: string,
    updatedAt?: Date,
  ) {
    super(type, original, thumbnail);
    this.updatedAt = updatedAt ?? new Date();
  }

  public get UpdatedAt(): Date {
    return this.updatedAt;
  }
}
