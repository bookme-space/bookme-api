import { Controller, Get, Param, Patch } from '@nestjs/common';
import { SeatsService } from '../services/seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}
  @Get('/:id')
  public async getById(@Param('id') id: bigint) {
    return await this.seatsService.getById(id);
  }

  @Patch('bookSeat/:id')
  public async gebook(@Param('id') id: bigint) {
    return this.seatsService.bookSeat(id);
  }
  @Patch('confirm/:id')
  public async confirm(@Param('id') id: bigint) {
    return this.seatsService.confirm(id);
  }
  @Patch('cancelBook/:id')
  public async cancelBook(@Param('id') id: bigint) {
    return this.seatsService.cancelBook(id);
  }
  @Get()
  public async getAllByPlace(id: bigint) {
    return this.seatsService.getAllByPlace(id);
  }
}
