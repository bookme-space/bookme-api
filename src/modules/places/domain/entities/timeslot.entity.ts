enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

interface TimeRange {
  start: string;
  end: string;
}

export class TimeslotEntity {
  private readonly id: bigint;
  private readonly status: string;
  private readonly dayOfWeek: DayOfWeek;
  private readonly timeRange: TimeRange;

  constructor(
    id: bigint,
    status: string,
    dayOfWeek: DayOfWeek,
    timeRange: TimeRange,
  ) {
    this.id = id;
    this.status = status;
    this.dayOfWeek = dayOfWeek;
    this.timeRange = timeRange;
  }

  public get Id(): bigint {
    return this.id;
  }
  public get Status(): string {
    return this.status;
  }
  private get DayOfWeek(): DayOfWeek {
    return this.dayOfWeek;
  }
  private get TimeRange(): TimeRange {
    return this.timeRange;
  }
}
