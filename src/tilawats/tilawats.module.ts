import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Tilawat } from './entities/tilawat.entity';
import { TilawatsController } from './tilawats.controller';
import { TilawatService } from './tilawats.service';

@Module({
  imports: [
    //forwardRef(() => TilawatsModule),
    //,
    TypeOrmModule.forFeature([Tilawat]),
    UserEntity,
    Review,
    Comment,
  ],
  controllers: [TilawatsController],
  providers: [TilawatService],
})
export class TilawatsModule {}
