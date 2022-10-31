import { PartialType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePictureDto {
  @IsUrl()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly width: number;

  @IsNumber()
  @IsPositive()
  readonly height: number;

  @IsArray()
  @ArrayNotEmpty()
  readonly categoriesIds: number[];

  @IsNumber()
  @IsPositive()
  readonly photographerId: number;
}

export class UpdateCategoryDto extends PartialType(CreatePictureDto) {}
