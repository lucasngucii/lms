import { Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/common/responses';
import { RegisterDto } from './dtos';
import checkUsername from 'src/utils/check-username.util';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/accounts';
import { AccountRepository } from 'src/repositories/accounts';
import { CustomException } from 'src/common';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
   /**
    *
    */
   constructor(
      @InjectRepository(AccountEntity) private readonly accountRepository: AccountRepository,
      private readonly entityManager: EntityManager,
   ) {}

   private async findAccountByUsername(username: string): Promise<AccountEntity> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: { username: username },
         });

         return foundAccount;
      } catch (error) {
         throw new CustomException('Account not found', 404);
      }
   }

   private async createAccount(registerDto: RegisterDto): Promise<MessageResponse> {
      // check account exists
      const foundAccount = await this.findAccountByUsername(registerDto.username);
      if (foundAccount) {
         return {
            success: false,
            message: 'Account already exists',
            data: {},
         };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPw = bcrypt.hashSync(registerDto.password, salt);

      const newAccount = new AccountEntity({
         username: registerDto.username,
         password: hashPw,
         email: registerDto.email,
      });

      const saveAccount = await this.entityManager.save(newAccount);

      // send Email notification

      return {
         success: true,
         data: {
            saveAccount,
         },
         message: 'User registered successfully',
      };
   }

   public async register(registerDto: RegisterDto): Promise<MessageResponse> {
      checkUsername(registerDto.username);
      return await this.createAccount(registerDto);
   }
}
