import { Inject, Injectable } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDto, SinginDto } from './dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject( NATS_SERVICE )
        private readonly _client: ClientProxy
    ) {}

    async singin( singinDto: SinginDto ) {
        
        try {

            const response = await firstValueFrom(
                this._client.send( 'auth.singin.user', singinDto )
            );

            return response;
            
        } catch (error) {
           throw new RpcException( error );
        }

    }

    async register( registerDto: RegisterDto ) {
        
        try {

            const response = await firstValueFrom(
                this._client.send( 'auth.register.user', registerDto )
            );

            return response;
            
        } catch (error) {
           throw new RpcException( error );
        }

    }

}
