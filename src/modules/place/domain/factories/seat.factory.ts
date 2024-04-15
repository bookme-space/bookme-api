import { Injectable } from "@nestjs/common";

import { Seat, SeatProps } from "../entities";

@Injectable()
export class SeatFactory {
  public create(props: SeatProps): Seat {
    return new Seat(props);
  }
}
