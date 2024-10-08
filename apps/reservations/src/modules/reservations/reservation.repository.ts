import { BaseRepository } from '@app/common/modules';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './models/schema/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends BaseRepository<Reservation> {
  protected logger: Logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(Reservation.name) protected readonly model: Model<Reservation>,
  ) {
    super(model);
  }
}
