import { Entity } from "@core/domain";

import { Nullable } from "@app.types/common";
import { Overlapable } from "@app.types/interfaces";

import { DomainError } from "src/modules/abstract/throwable";

import { Tenant } from "../tenant/tenant.entity";
import { TimeslotProps, TimeslotStatus } from "./interfaces";
import { TimeslotRange } from "./timegane.value";

export class Timeslot extends Entity implements Overlapable {
  private status: TimeslotStatus;
  private timerange: TimeslotRange;

  private tenant?: Nullable<Tenant>;

  constructor(props: TimeslotProps) {
    super(props.id);
    this.status = props.status;
    this.timerange = props.timerange;
    this.tenant = props.tenant;
  }

  public get Status(): TimeslotStatus {
    return this.status;
  }
  public get Timerange(): TimeslotRange {
    return this.timerange;
  }

  public get IsTenantDefined(): boolean {
    return !Object.is(this.tenant, undefined);
  }
  public get Tenant(): Nullable<Tenant> {
    if (!this.IsTenantDefined)
      throw new DomainError("Failed to get Timeslot.Tenant");
    return this.tenant!;
  }
  public set Tenant(tenant: Nullable<Tenant>) {
    if (!this.IsTenantDefined)
      throw new DomainError("Failed to set Timeslot.Tenant");
    this.tenant = tenant;
  }

  public ToBooked(user: Tenant): void {
    if (this.Status == TimeslotStatus.Inactive)
      throw new DomainError("Invalid status");

    this.Tenant = user;
    this.status = TimeslotStatus.Booked;
  }

  public ToTaken(): void {
    if (this.Status != TimeslotStatus.Booked)
      throw new DomainError("Invalid status");

    this.status = TimeslotStatus.Taken;
  }

  public ToAvailable(): void {
    this.Tenant = null;
    this.status = TimeslotStatus.Available;
  }

  public IsOverlaps(object: Timeslot): boolean {
    return this.Timerange.IsOverlaps(object.Timerange);
  }
}
