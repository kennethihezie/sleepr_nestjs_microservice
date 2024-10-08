import { AppLoggerModule, DatabaseModule } from '@app/common/modules';
import { AppExceptionFilter } from '@app/common/shared/exception/app_exception_flter';
import { ResponseInterceptor } from '@app/common/shared/interceptors/response.interceptor';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppLoggerModule,
    PaymentsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },

    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class PaymentRootModule {}
