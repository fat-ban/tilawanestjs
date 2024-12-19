import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { CreateTilawatDto } from './dto/create-tilawat.dto';
import { UpdateTilawatDto } from './dto/update-tilawat.dto';
import { TilawatService } from './tilawats.service';

@Controller('api/tilawats')
export class TilawatsController {
  constructor(
    private readonly tilawatService: TilawatService,
    //private readonly config: ConfigService,
  ) {}
  @Post()
  addTilawa(@Body() body: CreateTilawatDto) {
    return this.tilawatService.create(body);
  }
  @Get()
  getAllTilawat() {
    return this.tilawatService.getAll();
  }

  @Get(':id')
  getTilawat(@Param('id', ParseIntPipe) id: number) {
    return this.tilawatService.getTilawa(id);
  }

  @Put(':id')
  updateTilawa(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTilawatDto,
  ) {
    return this.tilawatService.updateTilawat(id, body);
  }

  @Delete('id')
  deleteTilawa(@Param('id', ParseIntPipe) id: number) {
    return this.tilawatService.deleteTilawa(id);
  }

  @Get('most-reviewed')
  getMostReviewedTilawa() {
    return 'getMostReviewedTilawa';
  }

  @Get(':id/comments')
  getAllComments(@Param('id', ParseIntPipe) id: number) {
    return `getAllComments${id}`;
  }
  @Post(':id/reviews')
  addReview(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
