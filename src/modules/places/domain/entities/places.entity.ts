import { AddressEntity } from './address.entity';
import { PhotoEntity } from './photo.entity';
import { PlaceTagEntity } from './place-tag.entity';
import { SeatsEntity } from './seats.entity';

interface HoursOfWork {
  start: string;
  end: string;
}

export class PlacesIntity {
  private readonly id: bigint;
  private readonly name: string;
  private readonly description: string;
  private readonly address: AddressEntity;
  private readonly hoursOfWork: HoursOfWork;
  private readonly seats: SeatsEntity[] | undefined;
  private readonly gallery: PhotoEntity[];
  private readonly tags: PlaceTagEntity[];

  constructor(
    id: bigint,
    name: string,
    description: string,
    address: AddressEntity,
    hoursOfWork: HoursOfWork,
    seats: SeatsEntity[],
    gallery: PhotoEntity[],
    tags: PlaceTagEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.hoursOfWork = hoursOfWork;
    this.seats = seats;
    this.gallery = gallery;
    this.tags = tags;
  }
  public get Id(): bigint {
    return this.id;
  }
  public get Name(): string {
    return this.name;
  }
  public get Description(): string {
    return this.description;
  }
  public get Address(): AddressEntity {
    return this.address;
  }
  public get HoursOfWork(): HoursOfWork {
    return this.hoursOfWork;
  }
  public get Seats(): SeatsEntity[] | undefined {
    return this.seats;
  }
  public get Gallery(): PhotoEntity[] {
    return this.gallery;
  }
  public get Tags(): PlaceTagEntity[] {
    return this.tags;
  }
  public addSeats(seat: SeatsEntity): void {
    this.seats?.push(seat);
  }
}
