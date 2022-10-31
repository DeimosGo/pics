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
import {
  CreatePhotographerDto,
  UpdatePhotographerDto,
} from '../dtos/photographer.dto';
import { PhotographerService } from '../services/photographer.service';

@ApiTags('Photographer')
@Controller('photographer')
export class PhotographerController {
  constructor(private photographerService: PhotographerService) {}

  @Get()
  findAll() {
    return this.photographerService.findAll();
  }

  @Get(':photographerId')
  findById(@Param('photographerId', ParseIntPipe) photographerId: number) {
    return this.photographerService.findOne(photographerId);
  }

  @Post()
  create(@Body() payload: CreatePhotographerDto) {
    return this.photographerService.create(payload);
  }

  @Put(':photographerId')
  update(
    @Param('photographerId', ParseIntPipe) photographerId: number,
    @Body() payload: UpdatePhotographerDto,
  ) {
    return this.photographerService.update(photographerId, payload);
  }

  @Delete(':photographerId')
  remove(@Param('photographerId', ParseIntPipe) photographerId: number) {
    this.photographerService.delete(photographerId);
  }
}
