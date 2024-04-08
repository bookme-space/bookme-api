import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { PlacePreview } from "./preview.value";
import { PlaceTimerange } from "./timerange.value";

export type PlaceInclude = {};

export type PlaceWhere = {};

export type PlaceOrder = {};

export type PlaceEssentialProps = Readonly<
  Required<{
    name: string;
    description: string;
    address: string;
    timerange: PlaceTimerange;
  }>
>;

export type PlaceOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    preview: PlacePreview;
  }>
>;

export type PlaceProps = PlaceEssentialProps &
  PlaceOptionalProps;

export interface UnmarshalledPlace extends UnmarshalledEntity {
  readonly name: string;
  readonly description: string;
  readonly address: string;
  readonly timerange: PlaceTimerange;
  readonly preview: Nullable<PlacePreview>;
}
