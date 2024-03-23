export class PlaceTagEntity {
  private readonly id: bigint;
  private readonly name: string;
  private readonly icon: undefined | string;

  constructor(id: bigint, name: string, icon: undefined | string) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
  public get Id(): bigint {
    return this.id;
  }
  public get Name(): string {
    return this.name;
  }
  public get Icon(): undefined | string {
    return this.icon;
  }
}
