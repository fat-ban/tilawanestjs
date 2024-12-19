import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  public async create(data: CreateReviewDto) {
    const newReview = this.reviewsRepository.create(data);
    return await this.reviewsRepository.save(newReview);
  }

  /**
   *
   *  Get all review
   */

  public async getAllReviews() {
    return await this.reviewsRepository.find();
  }

  /**
   *
   *  Get one review by id
   */

  public async getReview(id: number) {
    const review = await this.reviewsRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException(' قارئ غير موجود');
    console.log(review);
    return review;
  }

  /**
   *
   *  Update review
   */
  public async updateReview(id: number, updateReviewDto: CreateReviewDto) {
    const reviewUpdated = await this.getReview(id);

    reviewUpdated.review = updateReviewDto.review ?? reviewUpdated.review;

    return this.reviewsRepository.save(reviewUpdated);
  }

  /**
   *
   *  Delete review
   */
  public async deleteReview(id: number) {
    const review = await this.getReview(id);
    await this.reviewsRepository.remove(review);

    return { message: 'تم حدف التعليق بنجاح' };
  }
}
