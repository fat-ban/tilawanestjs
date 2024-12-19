import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tilawat } from 'src/tilawats/entities/tilawat.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';

//const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity()
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @OneToMany(() => Tilawat, (tilawat) => tilawat.reader)
  tilawats: Tilawat[];
}

export class CreateCommentDto {
  @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  text?: string;
}
