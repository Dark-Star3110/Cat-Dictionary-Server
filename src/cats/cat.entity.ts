import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  origin: string;

  @Column({ length: 30 })
  lifeSpan: string;

  @Column('text')
  description: string;

  @Column('text')
  imgUrl: string;

  @ManyToOne(() => User, (user: User) => user.cats)
  user: User;
}
