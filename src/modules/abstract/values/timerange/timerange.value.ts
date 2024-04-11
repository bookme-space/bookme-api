import { DomainError } from "../../throwable";
import { ITime, ITimerange } from "./interfaces";

export abstract class Timerange implements ITimerange {
  protected readonly start: Date;
  protected readonly end: Date;

  constructor(start: Date, end: Date) {
    if (start.getTime() > end.getTime())
      throw new DomainError("Invalid Timerange");

    this.start = start;
    this.end = end;
  }

  public get StartAt(): ITime {
    return {
      timestamp: Timerange.ToUtc(this.start),
      hours: this.start.getUTCHours(),
      minutes: this.start.getUTCMinutes(),
    };
  }

  public get EndAt(): ITime {
    return {
      timestamp: Timerange.ToUtc(this.end),
      hours: this.end.getUTCHours(),
      minutes: this.end.getUTCMinutes(),
    };
  }

  protected static ToUtc(date: Date): number {
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  }
}
