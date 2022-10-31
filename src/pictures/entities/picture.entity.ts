import { Exclude } from 'class-transformer';
import { Photographer } from './../../users/entities/photographer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { PartialType } from '@nestjs/swagger';
import { CreatePictureDto } from '../dtos/picture.dto';

@Entity({ name: 'pictures' })
export class Picture {
  @PrimaryGeneratedColumn({ name: 'picture_id' })
  pictureId: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  width: number;

  @Column({ type: 'float' })
  height: number;

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

  @ManyToMany(() => Category, (category) => category.pictures)
  @JoinTable({
    name: 'picture_categories',
    joinColumn: { name: 'picture_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @ManyToOne(() => Photographer, (photographer) => photographer.pictures)
  photographer: Photographer;
}

export class UpdatePictureDto extends PartialType(CreatePictureDto) {}
