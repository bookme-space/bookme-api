import { Entity } from "@core/domain";

import { Nullable } from "@app.types/common";

import { PlaceProps } from "./interfaces";
import { PlacePreview } from "./preview.value";
import { PlaceTimerange } from "./timerange.value";

export class Place extends Entity {
  private name: string;
  private description: string;
  private address: string;
  private timerange: PlaceTimerange;
  private preview: Nullable<PlacePreview>;

  constructor(props: PlaceProps) {
    super(props.id);
    this.name = props.name;
    this.description = props.description;
    this.address = props.address;
    this.timerange = props.timerange;
    this.preview = props.preview ?? null;
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
}
