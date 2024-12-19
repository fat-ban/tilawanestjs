import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateReviewDto {
  @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @IsNumber()
  @Min(0)
  @Max(10)
  review: number;
}
