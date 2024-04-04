import { UUID } from "crypto";

export type EntityId = UUID;

export interface UnmarshalledEntity {
  id: EntityId;
}
