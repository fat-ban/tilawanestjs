import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class createReaderDto {
  @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  name?: string;
}
