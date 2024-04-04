import { IDateService } from "./base.date.service";

export class DateService extends IDateService {
  public ms(value: number, options?: { long: boolean }): string;
  public ms(value: string): number;
  public ms(
    _value: number | string,
    _options?: { long: boolean },
  ): string | number {
    throw new Error("Method not implemented.");
  }

  public override end(
    _duration: string,
    _startDate?: Date | undefined,
  ): Date {
    throw new Error("Method not implemented.");
  }
}
