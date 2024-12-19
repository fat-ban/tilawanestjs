import { PartialType } from '@nestjs/mapped-types';
import { createReaderDto } from './create-reader-dto';

export class UpdateReaderDto extends PartialType(createReaderDto) {}
