import ms from "ms";

import { IDateService } from "./base.date.service";

export class DateService extends IDateService {
  public ms(value: number, options?: { long: boolean }): string;
  public ms(value: string): number;
  public ms(
    value: any,
    options?: { long: boolean },
  ): string | number {
    return ms(value, options);
  }

  public override end(duration: string, startDate?: Date): Date {
    const now = Date.now();
    return new Date(
      (startDate?.getTime() ?? now) + this.ms(duration),
    );
  }
}
