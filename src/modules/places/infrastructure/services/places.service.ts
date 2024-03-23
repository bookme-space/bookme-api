import { Injectable } from '@nestjs/common';
import { PlacesRepository } from '../repositories/places.repository';

@Injectable()
export class PlacesService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  public async getById(id: bigint) {
    return this.placesRepository.getById(id);
  }

  public async getAll() {
    return this.placesRepository.getAll();
  }

  public async create(place: any) {
    return this.placesRepository.create(place);
  }
}
