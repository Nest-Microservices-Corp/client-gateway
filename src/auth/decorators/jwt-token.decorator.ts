import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

export const JwtToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = request.newToken as string;

    if(!token) {
        throw new InternalServerErrorException(`Token not found to headers ( called @AuthGuard? )`);
    }

    return token;
  },
);