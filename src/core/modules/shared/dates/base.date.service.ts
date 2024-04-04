export abstract class IDateService {
  public abstract ms(value: string): number;
  public abstract ms(
    value: number,
    options?: { long: boolean },
  ): string;

  public abstract end(duration: string, startDate?: Date): Date;
}
