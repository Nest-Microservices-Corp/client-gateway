import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
import { NATS_SERVICE } from '../../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITokenVerifyResponse } from '../interfaces';
  
  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
        @Inject( NATS_SERVICE )
        private readonly _client: ClientProxy
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Token no provided in headers');
      }

      try {

        const response: ITokenVerifyResponse = await firstValueFrom(
            this._client.send('auth.verify.token', { token })
        );

        request['user'] = response.user;
        request['newToken'] = response.token;
        
      } catch ( error ) {
        throw new UnauthorizedException('Token invalid');
      }
      return true;
    }
  
    private extractTokenFromHeader( request: Request ): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

  }