import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
} from "@nestjs/swagger";

import { CreatePlaceDto } from "./dto/place.dtos/create.place.dto";

@ApiBearerAuth()
@ApiTags("places")
@Controller("places")
export class PlaceController {
  @ApiBody({ type: CreatePlaceDto })
  @Post()
  public async create(@Body() body: CreatePlaceDto) {
    console.log(body);
    return "";
  }
}
