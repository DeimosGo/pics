import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePhotographerDto,
  UpdatePhotographerDto,
} from '../dtos/photographer.dto';
import { Photographer } from '../entities/photographer.entity';

@Injectable()
export class PhotographerService {
  constructor(
    @InjectRepository(Photographer)
    private photographerRepo: Repository<Photographer>,
  ) {}

  findAll() {
    return this.photographerRepo.find();
  }

  async findOne(id: number) {
    const photographer = await this.photographerRepo.findOneBy({
      photographerId: id,
    });
    if (!photographer) {
      throw new NotFoundException('Photographer not found');
    }
    return photographer;
  }

  create(payload: CreatePhotographerDto) {
    const photographer = this.photographerRepo.create(payload);
    return this.photographerRepo.save(photographer);
  }

  async update(id: number, changes: UpdatePhotographerDto) {
    const photographer = await this.photographerRepo.findOneBy({
      photographerId: id,
    });
    if (!photographer) {
      throw new NotFoundException('Photographer not found');
    }
    this.photographerRepo.merge(photographer, changes);
    return this.photographerRepo.save(photographer);
  }

  async delete(id: number) {
    return this.photographerRepo.delete(id);
  }
}
