export enum SourceType {
  Gif,
  Image,
  Video,
}

export interface UnmarshalledSource {
  original: string;
  thumbnail: string;
}
