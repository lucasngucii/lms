import { Module } from '@nestjs/common';
import { KeytokenService } from './keytoken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyTokenEntity } from 'src/entities/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([KeyTokenEntity]),
      JwtModule.registerAsync({
         useFactory: async () => ({
            secret: process.env.JWT_SECRET,
         }),
      }),
   ],
   providers: [KeytokenService],
})
export class KeytokenModule {}
