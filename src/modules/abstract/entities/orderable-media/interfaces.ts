import { EntityId } from "@core/domain";

import {
  MediaProperties,
  UnmarshalledMedia,
} from "../media/interfaces";
import { OrderableMedia } from "./orderable-media.entity";

export interface IReorderMedia {
  id: EntityId;
  order: number;
}

export interface IReorderedMedia<T extends OrderableMedia> {
  entity: T;
  order: number;
}

export type OrderableMediaProperties = MediaProperties &
  Readonly<Required<{ order: number }>>;

export interface UnmarshalledOrderableMedia
  extends UnmarshalledMedia {
  order: number;
}
