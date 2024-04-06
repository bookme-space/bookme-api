import { Overlapable } from "@app.types/interfaces";

import {
  ITimerange,
  Timerange,
} from "src/modules/abstract/values";

export enum DayOfWeek {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

export interface ITimeslotRange extends ITimerange {
  get Day(): DayOfWeek;
}

export class TimeslotRange
  extends Timerange
  implements ITimeslotRange, Overlapable
{
  private readonly day: DayOfWeek;

  constructor(start: Date, end: Date, day: DayOfWeek) {
    super(start, end);
    this.day = day;
  }

  public get Day(): DayOfWeek {
    return this.day;
  }

  public IsOverlaps(range: ITimeslotRange): boolean {
    const base = new Date(Timerange.ToUtc(new Date(0)));
    if (range.Day != this.Day) return false;

    const start = new Date(
      base.setUTCHours(this.StartAt.hours, this.StartAt.minutes),
    );

    const end = new Date(
      base.setUTCHours(this.EndAt.hours, this.EndAt.minutes),
    );

    const _start = new Date(
      base.setUTCHours(
        range.StartAt.hours,
        range.StartAt.minutes,
      ),
    );

    const _end = new Date(
      base.setUTCHours(range.EndAt.hours, range.EndAt.minutes),
    );

    return (
      Math.max(_start.getTime(), start.getTime()) <
      Math.min(_end.getTime(), end.getTime())
    );
  }
}
