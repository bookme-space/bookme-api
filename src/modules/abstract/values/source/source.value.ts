import { ISource, SourceType } from "./interfaces";

export abstract class Source implements ISource {
  protected readonly type: SourceType;
  protected readonly original: string;
  protected readonly thumbnail: string;

  constructor(
    type: SourceType,
    original: string,
    thumbnail: string,
  ) {
    this.type = type;
    this.original = original;
    this.thumbnail = thumbnail;
  }

  public get Type(): SourceType {
    return this.type;
  }
  public get Original(): string {
    return this.original;
  }
  public get Thumbnail(): string {
    return this.thumbnail;
  }

  public get Sources() {
    return {
      original: this.Original,
      thumbnail: this.Thumbnail,
    };
  }
}
