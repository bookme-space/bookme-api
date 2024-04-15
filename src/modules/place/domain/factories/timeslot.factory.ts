import { Injectable } from "@nestjs/common";

import { Timeslot, TimeslotProps } from "../entities";

@Injectable()
export class TimeslotFactory {
  public create(props: TimeslotProps): Timeslot {
    return new Timeslot(props);
  }
}
