import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateTilawatDto } from './create-tilawat.dto';

export class UpdateTilawatDto extends PartialType(CreateTilawatDto) {
  @IsNotEmpty()
  id: number;
}
