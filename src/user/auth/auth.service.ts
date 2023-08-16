import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';
import * as JWT from 'jsonwebtoken';
interface SignUpParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface SignInParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ email, password, name, phone }: SignUpParams, userType: UserType) {
    console.log(email);
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    console.log(userExists);
    if (userExists) {
      throw new ConflictException("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        user_type: userType,
      },
    });

    const token = await this.generateJWT(user.name, user.id);

    return {success:true,token, msg:"Successfully signed up"};
  }

  async signin({ email, password }: SignInParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }
    const token = await this.generateJWT(user.name, user.id);
    return {success:true,token, msg:"Successfully signed in"};
  }
  private async generateJWT(name: string, id: number): Promise<string> {
    return JWT.sign(
      {
        name,
        id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );
  }

  generateProductKey(email:string, usertype:UserType) {
    const string = `${email}-${usertype}-${process.env.PRODUCT_KEY_SECRET}`;
    return  bcrypt.hash(string,10)
  }
}
