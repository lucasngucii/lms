import { Module } from '@nestjs/common';
import { KeytokenService } from './keytoken.service';

@Module({
   providers: [KeytokenService],
})
export class KeytokenModule {}
