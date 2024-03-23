import { TimeslotEntity } from './timeslot.entity';

export class SeatsEntity {
  private readonly id: bigint;
  private readonly name: string | undefined;
  private readonly capacity: number;
  private readonly timeslots: TimeslotEntity[];

  constructor(
    id: bigint,
    name: string | undefined,
    capacity: number,
    timeslots: TimeslotEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.timeslots = timeslots;
  }
  public get Id(): bigint {
    return this.id;
  }
  public get Name(): string | undefined {
    return this.name;
  }
  public get Capacity(): number {
    return this.capacity;
  }
  public get Timeslots(): TimeslotEntity[] {
    return this.timeslots;
  }
  public addTimeslot(timeslot: TimeslotEntity): void {
    this.timeslots.push(timeslot);
  }
}
