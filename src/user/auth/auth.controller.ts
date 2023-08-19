import { Body, Controller, Get, Param, ParseEnumPipe, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, GenerateProductKeyDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { User, UserInfoType } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auythService: AuthService) {}
  @Post('/signup/:userType')
  async signUp(@Body() body: SignUpDto, @Param('userType', new ParseEnumPipe(UserType)) userType: UserType) {
    if(userType !== UserType.BUYER){
      if (!body.productKey) {
        throw new UnauthorizedException();
      }
      const validProudctKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
      
      const isValidProductKey = await bcrypt.compare(
        validProudctKey,
        body.productKey,
      );
      if(!isValidProductKey){
        throw new UnauthorizedException();
      }
    }
    return this.auythService.signup(body, userType);
  }
  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.auythService.signin(body);
  }
  @Post('/key')
  generateProductKey(@Body() body: GenerateProductKeyDto) {
    return this.auythService.generateProductKey(body.email, body.userType);
  }

  @Get("/me")
  getMe(@User() user: UserInfoType):UserInfoType {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
