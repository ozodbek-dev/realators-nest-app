import { ExecutionContext, NotFoundException, UnauthorizedException, createParamDecorator } from "@nestjs/common";
export interface UserInfoType {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!request.user) {
  throw new UnauthorizedException();
  }
  return request.user;
})