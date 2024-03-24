import { Controller, Get, Param, Post } from '@nestjs/common';

import { PlacesIntity } from '../../domain/entities/places.entity';
import { PlacesService } from '../services/places.service';

@Controller('place')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}
  @Get('/:id')
  public async getById(@Param('id') id: bigint) {
    return await this.placesService.getById(id);
  }

  @Get()
  public async getAll() {
    return this.placesService.getAll();
  }

  @Post()
  public async create(place: unknown) {
    return this.placesService.create(place as PlacesIntity);
  }
}
