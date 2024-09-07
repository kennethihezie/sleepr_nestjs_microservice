import { Module, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common/modules';
import { ReservationsRepository } from './reservation.repository';
import { Reservation, ReservationSchema } from './models/schema/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/shared/constants/services';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    ClientsModule.register([
      { name: AUTH_SERVICE, transport: Transport.TCP }
    ])
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
  ],
})
export class ReservationsModule { }
