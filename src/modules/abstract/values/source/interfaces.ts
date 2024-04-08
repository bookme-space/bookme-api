export enum SourceType {
  Gif,
  Image,
  Video,
}

export interface ISource {
  get Type(): SourceType;
  get Original(): string;
  get Thumbnail(): string;
}

export interface UnmarshalledSource {
  readonly type: keyof typeof SourceType;
  readonly original: string;
  readonly thumbnail: string;
}
