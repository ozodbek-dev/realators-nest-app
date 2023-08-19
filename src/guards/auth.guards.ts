import { CanActivate, ExecutionContext, Injectable,  } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken'
import { PrismaService } from "src/prisma/prisma.service";
interface JWTPayloadType{
  id: number
  name: string
  iat: number
  exp: number
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
  private readonly prisma:PrismaService) { }
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles?.length) {
      // Grap the jwt and verify it
      const req = context.switchToHttp().getRequest();
      const token = req.headers?.authorization?.split("Bearer ")[1];
      try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadType;
        const user = await this.prisma.user.findUnique({
          where: {
            id: payload.id,
          },
        })
        if (!user) return false
        console.log(user.user_type)
        if (roles.includes(user.user_type)) return true;
        return false
      } catch (error) {
        return false
      }
    }
    return true;
  }
}