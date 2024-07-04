import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SinginDto, RegisterDto } from './dto';
import { Auth, JwtToken, JwtUser } from './decorators';
import { IUser } from './interfaces';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  singin( @Body() singinDto: SinginDto ) {
    return this.authService.singin( singinDto );
  }

  @Post('register')
  register( @Body() registerDto: RegisterDto ) {
    return this.authService.register( registerDto );
  }

  @Auth()
  @Get('token')
  authToken( @JwtUser() user: IUser, @JwtToken() token: string ) {
    return {
      user,
      token
    };
  }

}
