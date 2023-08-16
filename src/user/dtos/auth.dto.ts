import { UserType } from '@prisma/client';
import {
  IsString,
  isNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  name: string;
  @Matches(/^(\+\998\s?)?\(?\d{2}\)?[\s.-]?\d{3}\)?[\s.-]?\d{2}[\s.-]?\d{2}$/, {
    message: 'Phone must be a valid phone number +998',
  })
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}
export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
export class GenerateProductKeyDto {
  @IsEmail()
  email: string;
  @IsEnum(UserType)
  userType: UserType;
}
