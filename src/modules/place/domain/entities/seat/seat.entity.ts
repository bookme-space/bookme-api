import { Entity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { Capacity } from "./capacity.value";
import { SeatProps } from "./interfaces";

export class SeatEntity extends Entity {
  private capacity: Capacity;
  private name: Nullable<string>;

  constructor(props: SeatProps) {
    super(props.id);
    this.capacity = props.capacity;
    this.name = props.name ?? null;
  }

  public get Capacity(): Capacity {
    return this.capacity;
  }

  public get Name(): Nullable<string> {
    return this.name;
  }
}
