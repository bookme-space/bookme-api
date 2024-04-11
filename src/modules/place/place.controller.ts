import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PlaceService } from "./application/services/place.service";
import { CreatePlaceDto } from "./dto/place.dtos/create.place.dto";
import { PlaceFullDto } from "./dto/place.dtos/place.full.dto";
import { PlaceMapper } from "./infrastructure/persistence/mappers/place.mapper";

@ApiBearerAuth()
@ApiTags("places")
@Controller("places")
export class PlaceController {
  constructor(
    private readonly service: PlaceService,
    private readonly mapper: PlaceMapper,
  ) {}

  @ApiBody({ type: CreatePlaceDto })
  @ApiOkResponse({ type: PlaceFullDto })
  @Post()
  public async create(@Body() body: CreatePlaceDto) {
    return this.service
      .create(body)
      .then((place) => this.mapper.toDto(place));
  }
}
