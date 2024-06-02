import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountEntity } from 'src/entities/accounts';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './mail/mail.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([AccountEntity]),
      CacheModule.register({
         ttl: 5,
         max: 10,
         isGlobal: true,
      }),
      MailModule,
   ],
   providers: [AuthService],
   controllers: [AuthController],
})
export class AuthModule {}
