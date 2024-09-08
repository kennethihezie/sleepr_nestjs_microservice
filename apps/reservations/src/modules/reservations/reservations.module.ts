import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common/modules';
import { ReservationsRepository } from './reservation.repository';
import { Reservation, ReservationSchema } from './models/schema/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENT_SERVICE } from '@app/common/shared/constants/services';
import { config } from '../../config/configuration';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    ClientsModule.register([
      {
        name: AUTH_SERVICE, transport: Transport.RMQ, options: {
          urls: [ config.app.rabbitMq ],
          queue: 'auth'
        }
      },
      {
        name: PAYMENT_SERVICE, transport: Transport.RMQ, options: {
          urls: [ config.app.rabbitMq ],
          queue: 'payments'
        }
      }
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
  ],
})
export class ReservationsModule { }
