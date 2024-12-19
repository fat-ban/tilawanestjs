import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { createReaderDto } from './dto/create-reader-dto';

@Controller('readers')
export class ReadersController {
  @Get()
  getAllReaders() {
    //getallReaders
  }
  @Get(':id')
  getReaderById(@Param('id') id: number) {
    return id;
  }
  @Post()
  createReader(@Body() body: createReaderDto) {
    return body;
  }
  @Patch(':id')
  updateReader(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return body;
  }
  @Delete('id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReader(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
