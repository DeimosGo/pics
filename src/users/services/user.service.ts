import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Photographer } from '../entities/photographer.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Photographer)
    private photographerRepo: Repository<Photographer>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { userId: id },
      relations: ['photographer'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    if (payload.photographerId) {
      const photographer = await this.photographerRepo.findOneBy({
        photographerId: payload.photographerId,
      });
      newUser.photographer = photographer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const target = await this.userRepo.findOneBy({ userId: id });
    if (!target) {
      throw new NotFoundException('User not found');
    }
    if (payload.photographerId) {
      const photographer = await this.photographerRepo.findOneBy({
        photographerId: id,
      });
      target.photographer = photographer;
    }
    this.userRepo.merge(target, payload);
    return this.userRepo.save(target);
  }

  async delete(id: number) {
    return this.userRepo.delete(id);
  }
}
