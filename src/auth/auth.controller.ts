import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SinginDto, RegisterDto } from './dto';

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

}
