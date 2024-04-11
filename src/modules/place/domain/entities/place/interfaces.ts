import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { UnmarshalledTimerange } from "src/modules/abstract/values";

import { UnmarshalledSeat } from "../seat/interfaces";
import { Seat } from "../seat/seat.entity";
import { PlacePreview } from "./preview.value";
import { PlaceTimerange } from "./timerange.value";

export type PlaceInclude = {
  readonly seats:
    | { timeslots: { tenant: boolean | EntityId } | boolean }
    | boolean;
};

export type PlaceWhere = {
  tenant: EntityId;
};

export type PlaceOrder = {};

export type PlaceEssentialProps = Readonly<
  Required<{
    name: string;
    description: string;
    owner: EntityId;
    address: string;
    timerange: PlaceTimerange;
  }>
>;

export type PlaceOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    preview: PlacePreview;
    seats: Seat[];
  }>
>;

export type PlaceProps = PlaceEssentialProps &
  PlaceOptionalProps;

export interface UnmarshalledPlace extends UnmarshalledEntity {
  readonly name: string;
  readonly description: string;
  readonly address: string;
  readonly timerange: UnmarshalledTimerange;
  readonly preview: Nullable<PlacePreview>;
  readonly seats?: UnmarshalledSeat[];
}
