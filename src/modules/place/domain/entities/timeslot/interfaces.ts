import { EntityId } from "@core/domain";

import { TimeslotRange } from "./timegane.value";

export enum TimeslotStatus {
  Available,
  Booked,
  Taken,
  Inactive,
}

export type TimeslotEssentialProps = Readonly<
  Required<{
    status: TimeslotStatus;
    timerange: TimeslotRange;
  }>
>;

export type TimeslotOptionalProps = Readonly<
  Partial<{ id: EntityId }>
>;

export type TimeslotProps = TimeslotEssentialProps &
  TimeslotOptionalProps;
