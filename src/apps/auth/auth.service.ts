import { Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/common/responses';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {
   /**
    *
    */
   constructor() {}

   public async register(registerDto: RegisterDto): Promise<MessageResponse> {
      
         return {
         success: true,
         data: registerDto,
         message: 'User registered successfully',
      };
   }
}
