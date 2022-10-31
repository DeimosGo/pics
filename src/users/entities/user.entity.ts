import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photographer } from './photographer.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 190 })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 190 })
  lastName: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Photographer, (photpgrapher) => photpgrapher.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'photographer_id' })
  photographer: Photographer;
}
