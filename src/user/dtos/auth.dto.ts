import { IsString, isNotEmpty, IsEmail, MinLength, Matches } from "class-validator";
export class SignUpDto {
  @IsString()
  name: string;
  @Matches(/^(\+\998\s?)?\(?\d{2}\)?[\s.-]?\d{3}\)?[\s.-]?\d{2}[\s.-]?\d{2}$/,{message:"Phone must be a valid phone number +998"})
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}