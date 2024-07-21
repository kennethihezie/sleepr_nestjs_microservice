import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservation.repository';
import { Reservation } from './models/schema/reservation.schema';
import { CreateReservationDto } from './models/dto/create-reservation.dto';
import { UpdateReservationDto } from './models/dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(private readonly repository: ReservationsRepository) {}

    async create(dto: CreateReservationDto): Promise<Reservation>{
        return await this.repository.create({...dto})
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
