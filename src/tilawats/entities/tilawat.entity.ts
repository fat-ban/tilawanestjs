import { Comment } from 'src/comments/entities/comment.entity';
import { Reader } from 'src/readers/entities/reader.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity()
export class Tilawat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'char', length: '10' })
  maqam: string;

  @Column()
  thumbnail: string;

  @Column()
  banner: string;

  @Column()
  total_reviews: number;

  @Column()
  translations: string;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
  //relation one to many
  @OneToMany(() => Review, (review) => review.tilawats)
  review: Review[];

  @ManyToOne(() => UserEntity, (user) => user.tilawats)
  user: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.tilawat) // Add this line
  comments: Comment[];

  @ManyToOne(() => Reader, (reader) => reader.tilawats)
  reader: Reader;
}
