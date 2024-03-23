interface GeoLocation {
  latitude: number;
  longitude: number;
}

export class AddressEntity {
  private readonly city: string;
  private readonly street: string;
  private readonly houseNumber: number;
  private readonly geolocation: GeoLocation | undefined;

  constructor(
    city: string,
    street: string,
    houseNumber: number,
    geolocation: GeoLocation | undefined,
  ) {
    this.city = city;
    this.street = street;
    this.houseNumber = houseNumber;
    this.geolocation = geolocation;
  }
  public get City(): string {
    return this.city;
  }
  public get Street(): string {
    return this.street;
  }
  public get HouseNumber(): number {
    return this.houseNumber;
  }
  public get GeoLocation(): GeoLocation | undefined {
    return this.geolocation;
  }
}
