import { BaseRepository } from "@core/infrastructure/persistence/base.repository.impl";
import { DatabaseClient } from "@core/modules/database";

import {
  Place,
  PlaceInclude,
  PlaceOrder,
  PlaceWhere,
} from "../../domain/entities";
import { IPlaceRepository } from "../../domain/place.repository";
import { PlaceMapper } from "./mappers/place.mapper";

export class PlaceRepositoryImpl
  extends BaseRepository<
    Place,
    "Place",
    PlaceInclude,
    PlaceWhere,
    PlaceOrder
  >
  implements IPlaceRepository
{
  constructor(mapper: PlaceMapper, db: DatabaseClient) {
    super("Place", mapper, db);
  }
}
