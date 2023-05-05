import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      const request = context.switchToHttp().getRequest();
      const userAgent = request.get('user-agent') || '';
      const { ip, method, path: url } = request;
      console.log(
        `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
          context.getHandler().name
        } invoked...`,
      );
      return next.handle().pipe(
        map((data) => {
          return {
            data,
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data.message,
          };
        }),
      );
    }
  }
}
