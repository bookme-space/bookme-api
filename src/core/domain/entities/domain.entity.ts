import { randomUUID } from "node:crypto";

import { EntityId } from "./interfaces";

export abstract class Entity {
  private id: EntityId;

  constructor(id?: EntityId) {
    this.id = id ?? randomUUID();
  }

  public get Id(): EntityId {
    return this.id;
  }

  public equals(entity: Entity): boolean {
    if (Object.is(entity, null)) return false;
    if (entity.Id === this.Id) return true;
    if (entity === this) return true;
    return false;
  }
}
