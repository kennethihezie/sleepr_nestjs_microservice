import { DatabaseModule, AppLoggerModule } from "@app/common/modules";
import { AppExceptionFilter } from "@app/common/shared/exception/app_exception_flter";
import { ResponseInterceptor } from "@app/common/shared/interceptors/response.interceptor";
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ReservationsModule } from "./reservations/reservations.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AppLoggerModule,
        DatabaseModule,
        ReservationsModule
    ],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({ whitelist: true, transform: true })
        },

        {
            provide: APP_FILTER,
            useClass: AppExceptionFilter
        },

        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        }
    ]
})
export class ReservationRootModule { }