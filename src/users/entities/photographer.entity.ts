import { Picture } from './../../pictures/entities/picture.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'photographers' })
export class Photographer {
  @PrimaryGeneratedColumn({ name: 'photographer_id' })
  photographerId: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne(() => User, (user) => user.photographer, { nullable: true })
  user: User;

  @OneToMany(() => Picture, (picture) => picture.photographer)
  pictures: Picture[];
}
