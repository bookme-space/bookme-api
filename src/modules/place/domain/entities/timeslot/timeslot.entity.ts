import { Entity } from "@core/domain";

import { Overlapable } from "@app.types/interfaces";

import { TimeslotProps, TimeslotStatus } from "./interfaces";
import { TimeslotRange } from "./timegane.value";

export class Timeslot extends Entity implements Overlapable {
  private status: TimeslotStatus;
  private timerange: TimeslotRange;

  constructor(props: TimeslotProps) {
    super(props.id);
    this.status = props.status;
    this.timerange = props.timerange;
  }

  public get Status(): TimeslotStatus {
    return this.status;
  }
  public get Timerange(): TimeslotRange {
    return this.timerange;
  }

  public IsOverlaps(object: Timeslot): boolean {
    return this.Timerange.IsOverlaps(object.Timerange);
  }
}
