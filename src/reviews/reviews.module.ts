import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tilawat } from 'src/tilawats/entities/tilawat.entity';
import { Review } from './entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), Tilawat],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
