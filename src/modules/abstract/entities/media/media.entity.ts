import { Entity } from "@core/domain";

import { Source } from "../../values";
import { MediaProperties } from "./interfaces";

class MediaSource extends Source {}

export abstract class Media extends Entity {
  protected created: Date;
  protected source: Source;

  constructor(properties: MediaProperties) {
    super(properties.id);

    this.created = properties.created ?? new Date();
    this.source = new MediaSource(
      properties.type,
      properties.original,
      properties.thumbnail,
    );
  }

  public get Created(): Date {
    return this.created;
  }
  public get Source(): Source {
    return this.source;
  }
}
