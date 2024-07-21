import { Module, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common/modules';
import { ReservationsRepository } from './reservation.repository';
import { Reservation, ReservationSchema } from './models/schema/reservation.schema';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppExceptionFilter } from '@app/common/shared/exception/app_exception_flter';
import { ResponseInterceptor } from '@app/common/shared/interceptors/response.interceptor';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,

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
  ],
})
export class ReservationsModule { }
