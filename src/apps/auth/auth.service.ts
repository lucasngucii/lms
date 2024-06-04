import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { EntityManager } from 'typeorm';
import { CustomException } from 'src/common';
import { MessageResponse } from 'src/common/responses';
import { RegisterDto } from './dtos';
import checkUsername from 'src/utils/check-username.util';
import { AccountEntity } from 'src/entities/accounts';
import { AccountRepository } from 'src/repositories/accounts';
import { setExpireAt } from '../../utils/setExpire.util';
import { validateUsername } from '../../utils/validate-username.util';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(AccountEntity) private readonly accountRepository: AccountRepository,
      private readonly entityManager: EntityManager,
   ) {}

   public async register(registerDto: RegisterDto): Promise<MessageResponse> {
      // check username is valid
      !validateUsername(registerDto.username);
      return await this.createAccount(registerDto);
   }

   public async login(loginDto: LoginDto): Promise<MessageResponse> {
      try {
         // validate username
         !validateUsername(loginDto.username);
         // check username is mail or not
         const checkUsernameResult = checkUsername(loginDto.username);

         if (checkUsernameResult) {
            const foundAccount = await this.findAccountByEmail(loginDto.username);
            if (!foundAccount) {
               return {
                  success: false,
                  message: 'Account not found',
                  data: {},
               };
            }
            return await this.transactionLoginAccount(loginDto, foundAccount);
         } else {
            const foundAccount = await this.findAccountByUsername(loginDto.username);
            if (!foundAccount) {
               return {
                  success: false,
                  message: 'Account not found',
                  data: {},
               };
            }
            return await this.transactionLoginAccount(loginDto, foundAccount);
         }
      } catch (err) {
         throw new CustomException('', HttpStatus.OK, err);
      }
   }

   // --------------------------------------------------------------------------------------------------

   private async transactionLoginAccount(
      loginDto: LoginDto,
      account: AccountEntity,
   ): Promise<MessageResponse> {
      try {
         // check password
         const checkPassword = bcrypt.compareSync(loginDto.password, account.password);
         if (checkPassword) {
            // update last login

            return {
               success: true,
               message: 'Login success',
               data: {
                  username: account.username,
                  email: account.email,
               },
            };
         }
         return {
            success: false,
            message: 'Password is incorrect',
            data: {},
         };
      } catch (error) {
         throw new CustomException('', HttpStatus.INTERNAL_SERVER_ERROR, error);
      }
   }

   private async findAccountByUsername(username: string): Promise<AccountEntity> {
      try {
         return await this.accountRepository.findOne({
            where: { username: username },
            select: {
               id: true,
               username: true,
               password: true,
               email: true,
               isVerified: true,
            },
         });
      } catch (error) {
         throw new CustomException('', HttpStatus.INTERNAL_SERVER_ERROR, error);
      }
   }

   private async findAccountByEmail(email: string): Promise<AccountEntity> {
      try {
         return await this.accountRepository.findOne({
            where: {
               email: email,
            },
            select: {
               id: true,
               username: true,
               password: true,
               email: true,
               isVerified: true,
            },
         });
      } catch (error) {
         throw new CustomException('', HttpStatus.INTERNAL_SERVER_ERROR, error);
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
      return {
         success: true,
         data: {
            saveAccount,
         },
         message: 'User registered successfully',
      };
   }

   private async setAccessToken(res: Response, access: string): Promise<void> {
      const expires = setExpireAt(3);
      res.cookie('access_token', access, {
         expires: expires,
         httpOnly: true,
         secure: true,
      });
   }
}
