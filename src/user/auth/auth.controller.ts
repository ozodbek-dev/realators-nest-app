import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auythService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body() body:SignUpDto
  ) {
    return this.auythService.signup();
  }
}
