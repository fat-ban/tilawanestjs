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

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  /***create newReview */
  @Post()
  createReview(@Body() body: CreateReviewDto) {
    return this.reviewService.create(body);
  }
  @Get()
  getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Get(':id')
  getReiewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getReview(id);
  }

  @Put(':id')
  updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewService.updateReview(id, body);
  }

  @Delete(':id')
  deleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.deleteReview(id);
  }
}
