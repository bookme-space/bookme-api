import { InjectDatabase } from 'src/core/modules/database/database.decorator';
import { BaseSeatsRepository } from '../../domain/base-repositories/base-seat.repository';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';
import { schema } from 'src/database/schema';
import { SeatsEntity } from '../../domain/entities/seats.entity';

@Injectable()
export class SeatsRepository implements BaseSeatsRepository {
  constructor(
    @InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  public async getById(id: bigint): Promise<SeatsEntity> {
    throw new Error('Method not implemented.');
  }
  public async bookSeat(id: bigint) {
    throw new Error('Method not implemented.');
  }
  public async confirm(id: bigint) {
    throw new Error('Method not implemented.');
  }
  public async cancelBook(id: bigint) {
    throw new Error('Method not implemented.');
  }
  public async getAllByPlace(id: bigint): Promise<SeatsEntity[]> {
    throw new Error('Method not implemented.');
  }
}
