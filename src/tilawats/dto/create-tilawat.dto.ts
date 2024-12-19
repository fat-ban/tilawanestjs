import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateTilawatDto {
  @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  title?: string;

  @IsString()
  @Length(5, 150)
  @IsOptional()
  description?: string;

  @IsString()
  maqam?: string;

  @IsString()
  thumbnail?: string;

  @IsString()
  banner?: string;

  @IsNumber()
  total_reviews?: number;

  @IsString()
  translations?: string;
}
