import { Module } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  //  imports: [MailerModule.forRootAsync({})],
   providers: [MailService],
   exports: [MailService],
})
export class MailModule {}
