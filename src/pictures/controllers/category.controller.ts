import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dtos/category.dto';
import { UpdateCategoryDto } from '../dtos/picture.dto';
import { CategoryService } from '../services/category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll() {
    this.categoryService.findAll();
  }

  @Get(':categoryId')
  findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.findOne(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':categoryId')
  update(
    @Param(':categoryId') categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, payload);
  }

  @Delete(':categoryId')
  remove(@Param('categoryId') categoryId: number) {
    return this.categoryService.remove(categoryId);
  }
}
