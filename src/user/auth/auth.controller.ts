import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, GenerateProductKeyDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auythService: AuthService) {}
  @Post('/signup/:userType')
  signUp(@Body() body: SignUpDto) {
    return this.auythService.signup(body);
  }
  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.auythService.signin(body);
  }
  @Post('/key')
  generateProductKey(@Body() body: GenerateProductKeyDto) {
    return this.auythService.generateProductKey(body.email, body.userType);
  }
}
