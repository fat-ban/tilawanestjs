import { PartialType } from '@nestjs/mapped-types';
//import { IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from 'src/readers/entities/reader.entity';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
