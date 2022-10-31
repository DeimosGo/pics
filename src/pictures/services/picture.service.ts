import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographer } from 'src/users/entities/photographer.entity';
import { Repository, In } from 'typeorm';
import { CreatePictureDto } from '../dtos/picture.dto';
import { Category } from '../entities/category.entity';
import { Picture, UpdatePictureDto } from '../entities/picture.entity';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture) private pictureRepo: Repository<Picture>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Photographer)
    private photographerRepo: Repository<Photographer>,
  ) {}

  findAll() {
    return this.pictureRepo.find();
  }

  async findOne(pictureId: number) {
    const picture = await this.pictureRepo.findOne({
      where: { pictureId: pictureId },
      relations: ['categories'],
    });
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    return picture;
  }

  async create(payload: CreatePictureDto) {
    const newPicture = this.pictureRepo.create(payload);
    if (payload.photographerId) {
      const photographer = await this.photographerRepo.findOneBy({
        photographerId: payload.photographerId,
      });
      newPicture.photographer = photographer;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        categoryId: In(payload.categoriesIds),
      });
      newPicture.categories = categories;
    }
    return this.pictureRepo.save(newPicture);
  }

  async update(pictureId: number, payload: UpdatePictureDto) {
    const target = await this.pictureRepo.findOneBy({ pictureId: pictureId });
    if (!target) {
      throw new NotFoundException('Picture not found');
    }
    if (payload.photographerId) {
      const photographer = await this.photographerRepo.findOneBy({
        photographerId: payload.photographerId,
      });
      target.photographer = photographer;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        categoryId: In(payload.categoriesIds),
      });
      target.categories = categories;
    }
    this.pictureRepo.merge(target, payload);
    return this.pictureRepo.save(target);
  }

  async addCategory(pictureId: number, categoryId: number) {
    const picture = await this.pictureRepo.findOneBy({ pictureId: pictureId });
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    const category = await this.categoryRepo.findOneBy({
      categoryId: categoryId,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    picture.categories.push(category);
    return this.pictureRepo.save(picture);
  }
  async removeCategory(pictureId: number, categoryId: number) {
    const picture = await this.pictureRepo.findOneBy({ pictureId: pictureId });
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    picture.categories.filter((category) => category.categoryId !== categoryId);
    return this.pictureRepo.save(picture);
  }

  async remove(pictureId: number) {
    return this.pictureRepo.delete(pictureId);
  }
}
