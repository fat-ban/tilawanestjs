import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createReaderDto } from './dto/create-reader-dto';
import { Reader } from './entities/reader.entity';
@Injectable()
export class ReadersService {
  constructor(private readonly readersRepository: Repository<Reader>) {}
  getAllReaders() {
    //get all raeder

    return this.readersRepository.find();
  }

  /**
   *
   *  get one reader by id
   */
  public async getReaderbyId(id: number) {
    //get all raeder
    const reader = await this.readersRepository.findOne({ where: { id } });
    if (!reader) throw new NotFoundException('قارء غير موجود');
    console.log(reader);
    return reader;
  }
  /**
   *
   *  Update reader
   */
  public async updateReader(id: number, updateReaderDto: createReaderDto) {
    const reader = await this.getReaderbyId(id);
    reader.name = updateReaderDto.name ?? reader.name;
    return this.readersRepository.save(reader);
  }

  /**
   *
   *  Delete reader
   */

  public async deleteReader(id: number) {
    const reader = await this.getReaderbyId(id);
    return this.readersRepository.remove(reader);
  }
}
