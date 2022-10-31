import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Photographer } from './entities/photographer.entity';
import { PhotographerService } from './services/photographer.service';

import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PhotographerController } from './controllers/photographer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photographer])],
  providers: [PhotographerService, UserService],
  controllers: [UserController, PhotographerController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
