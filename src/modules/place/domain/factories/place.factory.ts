import { Injectable } from "@nestjs/common";

import { Place, PlaceProps } from "../entities";

@Injectable()
export class PlaceFactory {
  public create(props: PlaceProps): Place {
    return new Place(props);
  }
}
