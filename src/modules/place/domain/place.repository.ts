import { IBaseRepository } from "@core/domain/abstract/base.repository";

import {
  Place,
  PlaceInclude,
  PlaceOrder,
  PlaceWhere,
} from "./entities";

export abstract class IPlaceRepository extends IBaseRepository<
  Place,
  PlaceInclude,
  PlaceWhere,
  PlaceOrder
> {}
