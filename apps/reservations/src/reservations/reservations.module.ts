import { Module, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common/modules';
import { ReservationsRepository } from './reservation.repository';
import { Reservation, ReservationSchema } from './models/schema/reservation.schema';
import { APP_PIPE } from '@nestjs/core';

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
  ],
})
export class ReservationsModule { }
