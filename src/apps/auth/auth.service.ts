import { Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/common/responses';
import { RegisterDto } from './dtos';
import checkUsername from 'src/utils/check-username.util';

@Injectable()
export class AuthService {
   /**
    *
    */
   constructor() {}

//    private async findAccountByUsername(username: string): boolean {
//       try {
         
//       } catch (error) {
         
//       }
//    }

   private async createAccount(registerDto: RegisterDto): Promise<MessageResponse> {
      return {
         success: true,
         data: registerDto,
         message: 'User registered successfully',
      };
   }

   public async register(registerDto: RegisterDto): Promise<MessageResponse> {
      checkUsername(registerDto.username);
      return await this.createAccount(registerDto);
   }
}
