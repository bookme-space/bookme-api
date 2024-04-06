export interface UnmarshalledTimerange {
  readonly start: Date;
  readonly end: Date;
}

export interface ITime {
  readonly timestamp: number;
  readonly hours: number;
  readonly minutes: number;
}

export interface ITimerange {
  get StartAt(): ITime;
  get EndAt(): ITime;
}
