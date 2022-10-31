import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { categoryId: categoryId },
      relations: ['pictures'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(categoryId: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({
      categoryId: categoryId,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(categoryId: number) {
    return this.categoryRepo.delete(categoryId);
  }
}
