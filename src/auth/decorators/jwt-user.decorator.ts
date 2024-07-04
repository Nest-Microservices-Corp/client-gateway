import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IUser;

    if(!user) {
        throw new InternalServerErrorException(`User not found to headers ( called @AuthGuard? )`);
    }

    return user;
  },
);