import { ApiPagination } from "@swagger/api.properties";

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { PagingQueryDto } from "@core/base.dtos";
import { EntityId } from "@core/domain";
import { ParseUUIDPipe } from "@core/infrastructure/pipes/parse.uuid.pipe";
import { IAls } from "@core/modules/als";

import { ITokenPayload } from "../user/domain/adapters";
import { PlaceService } from "./application/services/place.service";
import { CreatePlaceDto } from "./dto/place.dtos/create.place.dto";
import { PlaceFullDto } from "./dto/place.dtos/place.full.dto";
import { PlaceMapper } from "./infrastructure/persistence/mappers/place.mapper";
import { SeatMapper } from "./infrastructure/persistence/mappers/seat.mapper";

@ApiBearerAuth()
@ApiTags("places")
@Controller("places")
export class PlaceController {
  constructor(
    private readonly service: PlaceService,
    private readonly mapper: PlaceMapper,
    private readonly seatMapper: SeatMapper,
    private readonly als: IAls,
  ) {}

  @ApiParam({ name: "id", type: String, required: true })
  @ApiOkResponse({ type: PlaceFullDto })
  @Get(":id")
  public async getById(
    @Param("id", ParseUUIDPipe) id: EntityId,
  ) {
    const { id: tenantId } = this.als.get(
      "user",
    ) as ITokenPayload;

    const place = await this.service.getById({ id });

    return {
      ...this.mapper.toDto(place),
      seats: place.Seats.map((seat) => ({
        ...this.seatMapper.toDto(seat),
        isBookedByMe: seat.Timeslots.some((x) =>
          x.IsBookedByUser(tenantId),
        ),
      })),
    };
  }

  @ApiPagination(PlaceFullDto)
  @Get()
  public async getAll(@Query() { take, skip }: PagingQueryDto) {
    return this.service.getAll({ take, skip }).then((res) => ({
      ...res,
      items: res.items.map((place) => this.mapper.toDto(place)),
    }));
  }

  @ApiBody({ type: CreatePlaceDto })
  @ApiOkResponse({ type: PlaceFullDto })
  @Post()
  public async create(@Body() body: CreatePlaceDto) {
    return this.service
      .create(body)
      .then((place) => this.mapper.toDto(place));
  }

  @ApiParam({ name: "timeslotId", type: String, required: true })
  @ApiParam({ name: "seatId", type: String, required: true })
  @ApiParam({ name: "placeId", type: String, required: true })
  @Post("book/:placeId/seat/:seatId/timeslot/:timeslotId")
  public async book(
    @Param("placeId", ParseUUIDPipe) placeId: EntityId,
    @Param("seatId") seatId: EntityId,
    @Param("timeslotId") timeslotId: EntityId,
  ) {
    const { id: tenantId } = this.als.get(
      "user",
    ) as ITokenPayload;

    return this.service.bookTimeslot({
      tenantId,
      placeId,
      seatId,
      timeslotId,
    });
  }
}
