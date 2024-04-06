import { Entity, EntityId } from "@core/domain";

import { Nullable } from "@app.types/common";

import { DomainError } from "src/modules/abstract/throwable";

import { Seat } from "../seat/seat.entity";
import { PlaceProps } from "./interfaces";
import { PlacePreview } from "./preview.value";
import { PlaceTimerange } from "./timerange.value";

export class Place extends Entity {
  private name: string;
  private description: string;
  private address: string;
  private timerange: PlaceTimerange;
  private preview: Nullable<PlacePreview>;

  private seats?: Seat[];

  constructor(props: PlaceProps) {
    super(props.id);
    this.name = props.name;
    this.description = props.description;
    this.address = props.address;
    this.timerange = props.timerange;
    this.preview = props.preview ?? null;

    this.seats = props.seats;
  }

  public get Name(): string {
    return this.name;
  }
  public get Description(): string {
    return this.description;
  }
  public get Address(): string {
    return this.address;
  }
  public get Timerange(): PlaceTimerange {
    return this.timerange;
  }
  public get Preview(): Nullable<PlacePreview> {
    return this.preview;
  }

  public get IsSeatsDefined(): boolean {
    return !Object.is(this.seats, undefined);
  }
  public get Seats(): Seat[] {
    if (!this.IsSeatsDefined)
      throw new DomainError("Failed to get Place.Seats");
    return this.seats!;
  }
  private set Seats(value: Seat[]) {
    if (!this.IsSeatsDefined)
      throw new DomainError("Failed to set Place.Seats");
    this.seats = value;
  }

  public AddSeat(seat: Seat): void {
    this.Seats.push(seat);
  }
  public RemoveSeats(ids: EntityId): number {
    let rmCount = 0;
    this.Seats = this.Seats.filter(({ Id }) => {
      const isFound = ids.includes(Id);
      if (isFound) rmCount++;
      return !isFound;
    });
    return rmCount;
  }
}
