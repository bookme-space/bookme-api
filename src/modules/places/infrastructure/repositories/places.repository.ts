import { InjectDatabase } from 'src/core/modules/database/database.decorator';
import { BasePlacesRepository } from '../../domain/base-repositories/base-place.repository';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';
import { PlacesIntity } from '../../domain/entities/places.entity';
import { schema } from 'src/database/schema';

@Injectable()
export class PlacesRepository implements BasePlacesRepository {
  constructor(
    @InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  public async getById(id: bigint): Promise<PlacesIntity> {
    throw new Error('Method not implemented.');
  }
  public async getAll(): Promise<PlacesIntity[]> {
    throw new Error('Method not implemented.');
  }
  public async create(place: PlacesIntity): Promise<PlacesIntity> {
    throw new Error('Method not implemented.');
  }
}
