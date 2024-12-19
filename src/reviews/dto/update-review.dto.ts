import { PartialType } from '@nestjs/mapped-types';
//import { IsNotEmpty } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
