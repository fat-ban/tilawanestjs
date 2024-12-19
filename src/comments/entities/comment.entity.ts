import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tilawat } from 'src/tilawats/entities/tilawat.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
//const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  //@IsNotEmpty()
  id: number;

  @Column({ type: 'varchar', length: '200' })
  text: string;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => Tilawat, (tilawat) => tilawat.comments)
  tilawat: Tilawat;
}
