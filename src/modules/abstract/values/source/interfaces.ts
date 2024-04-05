export enum SourceType {
  Gif,
  Image,
  Video,
}

export interface UnmarshalledSource {
  readonly original: string;
  readonly thumbnail: string;
}
