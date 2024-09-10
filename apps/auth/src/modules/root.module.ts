import { AppLoggerModule, DatabaseModule } from "@app/common/modules";
import { AppExceptionFilter } from "@app/common/shared/exception/app_exception_flter";
import { ResponseInterceptor } from "@app/common/shared/interceptors/response.interceptor";
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        AppLoggerModule,
        AuthModule
    ],
    providers: [
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
    ]
})
export class AuthRootModule {}