import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { UnmarshalledTimeslot } from "../timeslot/interfaces";
import { Timeslot } from "../timeslot/timeslot.entity";
import { Capacity } from "./capacity.value";

export type SeatEssentialProps = Readonly<
  Required<{
    capacity: Capacity;
  }>
>;

export type SeatOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    name: string;
    timeslots: Timeslot[];
  }>
>;

export type SeatProps = SeatEssentialProps & SeatOptionalProps;

export interface UnmarshalledSeat extends UnmarshalledEntity {
  name: Nullable<string>;
  capacity: number;
  timeslots?: UnmarshalledTimeslot[];
}
