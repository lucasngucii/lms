import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyTokenEntity } from 'src/entities/auth';
import { KeyTokenRepository } from 'src/repositories/auth';
import * as crypto from 'crypto';
import { CustomException } from 'src/common';
import { ITokenPair } from './interface/tokenPair.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class KeytokenService {
   constructor(
      @InjectRepository(KeyTokenEntity) private readonly keyTokenRepository: KeyTokenRepository,
      private readonly jwtService: JwtService,
   ) {}

   public async generateRsaKeyPair(): Promise<{
      publicKey: string;
      privateKey: string;
   }> {
      return new Promise((resolve, reject) => {
         crypto.generateKeyPair(
            'rsa',
            {
               modulusLength: 4096,
               publicKeyEncoding: {
                  type: 'pkcs1',
                  format: 'pem',
               },
               privateKeyEncoding: {
                  type: 'pkcs1',
                  format: 'pem',
               },
            },
            (err, publicKey, privateKey) => {
               if (err) {
                  reject(err);
               } else {
                  resolve({
                     publicKey: publicKey.toString(),
                     privateKey: privateKey.toString(),
                  });
               }
            },
         );
      });
   }

   public async createTokenPair(payload: any, publicKey, privateKey): Promise<ITokenPair> {
      try {
         const accessToken = await this.jwtService.signAsync(payload, {
            secret: privateKey,
            expiresIn: '1h',
            algorithm: 'RS256',
         });
         const refreshToken = await this.jwtService.signAsync(payload, {
            secret: privateKey,
            expiresIn: '7d',
            algorithm: 'RS256',
         });
         return {
            accessToken: accessToken,
            refreshToken: refreshToken,
         };
      } catch (error) {
         throw new CustomException(error);
      }
   }
}
