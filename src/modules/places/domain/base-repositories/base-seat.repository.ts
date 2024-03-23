import { SeatsEntity } from '../entities/seats.entity';

export abstract class BaseSeatsRepository {
  public abstract getById(id: bigint): Promise<SeatsEntity>;
  public abstract bookSeat(id: bigint): void;
  public abstract confirm(id: bigint): void;
  public abstract cancelBook(id: bigint): void;
  public abstract getAllByPlace(id: bigint): Promise<SeatsEntity[]>;
}
