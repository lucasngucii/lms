import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import * as _ from 'underscore';

@Controller('auth')
export class AuthController {
   /**
    *
    */
   constructor(private readonly authService: AuthService) {}
   @Post('register')
   public async register(@Body() registerDto: RegisterDto): Promise<unknown> {
      const res = await this.authService.register(registerDto);
      return _.omit(res, 'password');
   }
}
