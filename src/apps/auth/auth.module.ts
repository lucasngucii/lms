import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/entity.providers';

@Module({
   imports: [TypeOrmModule.forFeature(entities)],
   providers: [AuthService],
   controllers: [AuthController],
})
export class AuthModule {}
