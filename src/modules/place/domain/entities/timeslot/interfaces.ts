import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { UnmarshalledTimerange } from "src/modules/abstract/values";

import { UnmarshalledTenant } from "../tenant/interfaces";
import { Tenant } from "../tenant/tenant.entity";
import { DayOfWeek, TimeslotRange } from "./timegane.value";

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
  Partial<{ id: EntityId; tenant: Nullable<Tenant> }>
>;

export type TimeslotProps = TimeslotEssentialProps &
  TimeslotOptionalProps;

export interface UnmarshalledTimeslot
  extends UnmarshalledEntity {
  status: keyof typeof TimeslotStatus;
  timerange: UnmarshalledTimerange & {
    day: keyof typeof DayOfWeek;
  };
  tenant?: Nullable<UnmarshalledTenant>;
}
