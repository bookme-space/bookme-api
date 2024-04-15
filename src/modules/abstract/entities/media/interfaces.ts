import { EntityId, UnmarshalledEntity } from "@core/domain";

import { SourceType, UnmarshalledSource } from "../../values";

export type MediaEssentialProperties = Readonly<
  Required<{
    type: SourceType;
    original: string;
    thumbnail: string;
  }>
>;

export type MediaOptionalProperties = Readonly<
  Partial<{
    id: EntityId;
    created: Date;
  }>
>;

export type MediaProperties = MediaEssentialProperties &
  MediaOptionalProperties;

export interface UnmarshalledMedia extends UnmarshalledEntity {
  created: Date;
  source: UnmarshalledSource;
}
