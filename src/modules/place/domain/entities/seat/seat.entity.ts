import { Entity, EntityId } from "@core/domain";

import { Nullable } from "@app.types/common";

import { DomainError } from "src/modules/abstract/throwable";

import { Timeslot } from "../timeslot/timeslot.entity";
import { Capacity } from "./capacity.value";
import { SeatProps } from "./interfaces";

export class Seat extends Entity {
  private capacity: Capacity;
  private name: Nullable<string>;

  private timeslots?: Timeslot[];

  constructor(props: SeatProps) {
    super(props.id);
    this.capacity = props.capacity;
    this.name = props.name ?? null;
    this.timeslots = props.timeslots;
  }

  public get Capacity(): Capacity {
    return this.capacity;
  }
  public get Name(): Nullable<string> {
    return this.name;
  }

  public get IsTimeslotsDefined(): boolean {
    return !Object.is(this.timeslots, undefined);
  }
  public get Timeslots(): Timeslot[] {
    if (!this.IsTimeslotsDefined)
      throw new DomainError("Failed to get Seat.Timeslots");
    return this.timeslots!;
  }
  private set Timeslots(value: Timeslot[]) {
    if (!this.IsTimeslotsDefined)
      throw new DomainError("Failed to set Seat.Timeslots");
    this.timeslots = value;
  }

  public AddTimeslot(timeslot: Timeslot): void {
    this.Timeslots.push(timeslot);
  }
  public RemoveTimeslots(ids: EntityId[]): number {
    let rmCount = 0;
    this.Timeslots = this.Timeslots.filter(({ Id }) => {
      const isFound = ids.includes(Id);
      if (isFound) rmCount++;
      return !isFound;
    });
    return rmCount;
  }
}
