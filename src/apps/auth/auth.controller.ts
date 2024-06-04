import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import { MessageResponse } from '../../common';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post('register')
   public async register(@Body() registerDto: RegisterDto): Promise<MessageResponse> {
      return await this.authService.register(registerDto);
   }
   @HttpCode(HttpStatus.OK)
   @Post('login')
   public async login(@Body() loginDto: LoginDto): Promise<MessageResponse> {
      return await this.authService.login(loginDto);
   }
}
