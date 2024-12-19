import { Comment } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Tilawat } from 'src/tilawats/entities/tilawat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '150', nullable: true })
  username: string;

  @Column({ type: 'varchar', length: '250', unique: true })
  email: string;

  @Column({ type: 'char', length: '60' })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @OneToMany(() => Tilawat, (tilawat) => tilawat.user)
  tilawats: Tilawat[];

  @OneToMany(() => Comment, (comment) => comment.user) // This is correct
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
} //can we find logic
