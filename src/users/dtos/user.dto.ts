import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  photographerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
