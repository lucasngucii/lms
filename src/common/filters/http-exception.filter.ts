import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { IHttpException } from './http-exception.filter.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
   private readonly logger;
   private message: string;
   private error: any;
   constructor({ message, error }: IHttpException) {
      this.message = message;
      this.error = error;
   }
   catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus() || 500;

      response.status(status).json({
         statusCode: status,
         timestamp: new Date().toISOString(),
         path: ctx.getRequest().url,
         message: this.message,
         error: this.error,
      });
   }
}
