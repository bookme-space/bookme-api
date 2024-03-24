import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Injectable } from '@nestjs/common';

import { InjectDatabase } from 'src/core/modules/database/database.decorator';
import { schema } from 'src/database/schema';

import { BasePlacesRepository } from '../../domain/base-repositories/base-place.repository';
import { PlacesIntity } from '../../domain/entities/places.entity';

@Injectable()
export class PlacesRepository implements BasePlacesRepository {
  constructor(
    @InjectDatabase()
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  public async getById(_: bigint): Promise<PlacesIntity> {
    throw new Error('Method not implemented.');
  }
  public async getAll(): Promise<PlacesIntity[]> {
    throw new Error('Method not implemented.');
  }
  public async create(_: PlacesIntity): Promise<PlacesIntity> {
    throw new Error('Method not implemented.');
  }
}
