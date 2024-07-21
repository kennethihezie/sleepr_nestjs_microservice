import { Module, ValidationPipe } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppExceptionFilter } from '@app/common/shared/exception/app_exception_flter';
import { ResponseInterceptor } from '@app/common/shared/interceptors/response.interceptor';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,

    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true })
    }
  ],
})
export class AuthModule { }
