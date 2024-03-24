import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Injectable } from '@nestjs/common';

import { InjectDatabase } from 'src/core/modules/database/database.decorator';
import { schema } from 'src/database/schema';

import { BaseSeatsRepository } from '../../domain/base-repositories/base-seat.repository';
import { SeatsEntity } from '../../domain/entities/seats.entity';

@Injectable()
export class SeatsRepository implements BaseSeatsRepository {
  constructor(
    @InjectDatabase()
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  public async getById(_: bigint): Promise<SeatsEntity> {
    throw new Error('Method not implemented.');
  }
  public async bookSeat(_: bigint) {
    throw new Error('Method not implemented.');
  }
  public async confirm(_: bigint) {
    throw new Error('Method not implemented.');
  }
  public async cancelBook(_: bigint) {
    throw new Error('Method not implemented.');
  }
  public async getAllByPlace(_: bigint): Promise<SeatsEntity[]> {
    throw new Error('Method not implemented.');
  }
}
