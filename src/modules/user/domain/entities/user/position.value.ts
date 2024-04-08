export class Position {
  private readonly lat: number;
  private readonly long: number;

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }

  public get Lat(): number {
    return this.lat;
  }

  public get Long(): number {
    return this.long;
  }
}
