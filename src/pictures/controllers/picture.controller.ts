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
import { CreatePictureDto } from '../dtos/picture.dto';
import { UpdatePictureDto } from '../entities/picture.entity';
import { PictureService } from '../services/picture.service';

@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':pictureId')
  findOne(@Param('pictureId', ParseIntPipe) pictureId: number) {
    return this.pictureService.findOne(pictureId);
  }

  @Post()
  create(@Body() payload: CreatePictureDto) {
    return this.pictureService.create(payload);
  }

  @Put(':pictureId')
  update(
    @Param('pictureId') pictureId: number,
    @Body() payload: UpdatePictureDto,
  ) {
    return this.pictureService.update(pictureId, payload);
  }

  @Put(':pictureId/category/:categoryId')
  addCategory(
    @Param('pictureId', ParseIntPipe) pictureId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.pictureService.addCategory(pictureId, categoryId);
  }

  @Delete(':pictureId/category/:categoryId')
  removePicture(
    @Param('pictureId', ParseIntPipe) pictureId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.pictureService.removeCategory(pictureId, categoryId);
  }

  @Delete(':pictureId')
  remove(@Param('pictureId') pictureId: number) {
    return this.pictureService.remove(pictureId);
  }
}
