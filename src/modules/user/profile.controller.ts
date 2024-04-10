import { Controller, Get } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PlaceFullDto } from "../place/dto/place.dtos/place.full.dto";
import { PlaceMapper } from "../place/infrastructure/persistence/mappers/place.mapper";
import { ProfileService } from "./application/services/profile.service";
import { UserDto } from "./dtos";
import { UserMapper } from "./infrastructure/persistence/mappers/user.mapper";

@ApiBearerAuth()
@ApiTags("profile")
@Controller("profile")
export class ProfileController {
  constructor(
    private readonly service: ProfileService,
    private readonly mapper: UserMapper,
    private readonly placeMapper: PlaceMapper,
  ) {}

  @ApiOkResponse({ type: UserDto })
  @Get()
  public async getProfile() {
    return this.service
      .getProfile()
      .then((user) => this.mapper.toDto(user));
  }

  @ApiOkResponse({ type: [PlaceFullDto] })
  @Get("reservations")
  public async getReservations() {
    return this.service
      .getReservations()
      .then((res) =>
        res.map((place) => this.placeMapper.toDto(place)),
      );
  }
}
