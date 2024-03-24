import { PlacesIntity } from '../entities/places.entity';

export abstract class BasePlacesRepository {
  public abstract getById(id: bigint): Promise<PlacesIntity>;
  public abstract getAll(): Promise<PlacesIntity[]>;
  public abstract create(
    place: PlacesIntity,
  ): Promise<PlacesIntity>;
}
