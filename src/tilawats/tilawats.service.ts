import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTilawatDto } from './dto/create-tilawat.dto';
import { Tilawat } from './entities/tilawat.entity';

@Injectable()
export class TilawatService {
  constructor(
    @InjectRepository(Tilawat)
    private readonly tilawatsRepository: Repository<Tilawat>,
  ) {}

  /*private tilawat = [
    {
      id: 1,
      title: '1تلاوة',
    },
    {
      id: 2,
      title: '2تلاوة',
    },
  ];*/

  /**
   * create new tilawa
   */
  public async create(data: CreateTilawatDto) {
    const newTilawa = this.tilawatsRepository.create(data);
    return await this.tilawatsRepository.save(newTilawa);
  }

  /**
   *
   *  Get all tilawa
   */

  getAll() {
    return this.tilawatsRepository.find();
  }

  /**
   *
   *  Get one tilawa by id
   */

  public async getTilawa(id: number) {
    const tilawa = await this.tilawatsRepository.findOne({ where: { id } });
    if (!tilawa) throw new NotFoundException('تلاوة غير متوفرة');
    console.log(tilawa);
    return tilawa;
  }

  /**
   *
   *  Update tilawa
   */
  public async updateTilawat(id: number, updateTilawaDto: CreateTilawatDto) {
    const tilawa = await this.getTilawa(id);

    tilawa.title = updateTilawaDto.title ?? tilawa.title;
    tilawa.description = updateTilawaDto.description ?? tilawa.description;
    tilawa.maqam = updateTilawaDto.maqam ?? tilawa.maqam;
    tilawa.thumbnail = updateTilawaDto.thumbnail ?? tilawa.thumbnail;
    tilawa.banner = updateTilawaDto.banner ?? tilawa.banner;
    tilawa.total_reviews =
      updateTilawaDto.total_reviews ?? tilawa.total_reviews;
    tilawa.translations = updateTilawaDto.translations ?? tilawa.translations;

    return this.tilawatsRepository.save(tilawa);
  }

  /**
   *
   *  Delete tilawa
   */
  public async deleteTilawa(id: number) {
    const tilawa = await this.getTilawa(id);
    await this.tilawatsRepository.remove(tilawa);

    return { message: 'تم حدف التلاوة بنجاح' };
  }
}
