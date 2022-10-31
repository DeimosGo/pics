import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Picture } from './entities/picture.entity';
import { CategoryService } from './services/category.service';
import { PictureService } from './services/picture.service';
import { CategoryController } from './controllers/category.controller';
import { PictureController } from './controllers/picture.controller';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Picture, Category]), UsersModule],
  providers: [CategoryService, PictureService],
  controllers: [CategoryController, PictureController],
  exports: [TypeOrmModule, PictureService],
})
export class PicturesModule {}
