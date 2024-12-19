import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Comment } from 'src/comments/entities/comment.entity';
//import { Review } from 'src/reviews/entities/review.entity';
//import { Tilawat } from 'src/tilawats/entities/tilawat.entity';
import { jwtConstants } from './constant';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    //forwardRef(() => TilawatsModule),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => {
        const jwtSecret = jwtConstants.JWT_SECRET;
        console.log('JWT_SECRET:', jwtSecret);
        return {
          global: true,
          secret: jwtSecret,
          signOptions: { expiresIn: '60s' }, //expiresIn: config.get<string>('JWT_EXPIRES_IN') },
        };
      },
    }),
    /*Tilawat,
    Comment,
    Review,*/
  ],
})
export class UsersModule {}
