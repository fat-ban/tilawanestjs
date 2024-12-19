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

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  review: number;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => Review, (tilawat) => tilawat.review)
  tilawats: Tilawat;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
