import { Inject, Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservation.repository';
import { Reservation } from './models/schema/reservation.schema';
import { CreateReservationDto } from './models/dto/create-reservation.dto';
import { UpdateReservationDto } from './models/dto/update-reservation.dto';
import { CREATE_CHARGE_ROUTE, PAYMENT_SERVICE } from '@app/common/shared/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
    constructor(private readonly repository: ReservationsRepository, @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy) {}

    async create(userId: string, { charge, ...data }: CreateReservationDto){
        return this.paymentService.send(CREATE_CHARGE_ROUTE, charge).pipe(
            map(async (response) => {
                const reservation = await this.repository.create({ ...data, userId, invoiceId: response.id } as Reservation)
                return reservation
            })
        )
    }

    async findAll(): Promise<Reservation[]> {
        return await this.repository.find()
    }

    async findOne(id: string): Promise<Reservation> {
        return await this.repository.findOne({ _id: id })
    }

    async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
        return this.repository.findOneAndUpdate({ _id: id }, { ...dto })
    }

    async remove(id: string): Promise<Reservation> {
        return this.repository.findOneAndDelete({ _id: id })
    }
 }
