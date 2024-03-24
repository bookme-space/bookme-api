import { Injectable } from '@nestjs/common';

import { SeatsRepository } from '../repositories/seats.repository';

@Injectable()
export class SeatsService {
  constructor(
    private readonly placesRepository: SeatsRepository,
  ) {}

  public async getById(id: bigint) {
    return this.placesRepository.getById(id);
  }

  public async bookSeat(id: bigint) {
    return this.placesRepository.bookSeat(id);
  }
  public async confirm(id: bigint) {
    return this.placesRepository.confirm(id);
  }
  public async cancelBook(id: bigint) {
    return this.placesRepository.cancelBook(id);
  }
  public async getAllByPlace(id: bigint) {
    return this.placesRepository.getAllByPlace(id);
  }
}
