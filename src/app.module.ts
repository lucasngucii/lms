import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { PostgresDbModule } from './common';
@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         validationSchema: Joi.object({
            NODE_ENV: Joi.string()
               .required()
               .valid('development', 'production', 'test', 'provision'),
            PORT: Joi.number().required().default(3000),
         }),
      }),

      ThrottlerModule.forRoot([
         {
            ttl: 60,
            limit: 10,
         },
      ]),

      BullModule.forRootAsync({
         useFactory: (configService: ConfigService) => ({
            redis: {
               host: configService.getOrThrow<string>('REDIS_HOST'),
               port: configService.getOrThrow<number>('REDIS_PORT'),
            },
         }),
         inject: [ConfigService],
      }),

      CacheModule.registerAsync({
         useFactory: (configService: ConfigService) => ({
            store: 'redis',
            host: configService.getOrThrow<string>('REDIS_HOST'),
            port: configService.getOrThrow<number>('REDIS_PORT'),
         }),
         inject: [ConfigService],
      }),

      PostgresDbModule,
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
