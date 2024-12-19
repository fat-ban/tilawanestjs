import { Module } from '@nestjs/common';
import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';
//import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [TypeOrmModule.forFeature([Reader])],
  controllers: [ReadersController],
  providers: [ReadersService],
})
export class ReadersModule {}
