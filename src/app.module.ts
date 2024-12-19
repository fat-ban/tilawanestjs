import { Module } from '@nestjs/common';
//import { usersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TilawatsModule } from './tilawats/tilawats.module';
//import { Controller } from './.controller';
//import { ReadersController } from './readers/readers.controller';
//import { ReadersService } from './readers/readers.service';
//import { ReadersModule } from './readers/readers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Reader } from './readers/entities/reader.entity';
import { Review } from './reviews/entities/review.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Tilawat } from './tilawats/entities/tilawat.entity';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TilawatsModule,
    //ReadersModule,
    UsersModule,
    ReviewsModule,
    CommentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'), // Use environment variable
        port: config.get<number>('DB_PORT', 3306), // Use environment variable
        username: config.get<string>('DB_USERNAME', 'root'), // Use environment variable
        password: config.get<string>('DB_PASSWORD', 'root'), // Use environment variable
        database: config.get<string>('DB_DATABASE', 'nest_api_tilawats'), // Use environment variable
        entities: [Tilawat, UserEntity, Review, Reader, Comment],
        synchronize: true,
        //logging: true, //help debug any database-related problems
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: '.env.development',
    }),
  ],
  //controllers: [CommentsController],
  //providers: [CommentsService],
  //controllers: [ReviewsController],
  //providers: [ReviewsService],
})
export class AppModule {}
