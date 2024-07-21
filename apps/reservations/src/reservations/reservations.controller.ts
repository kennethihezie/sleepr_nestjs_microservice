import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './models/dto/create-reservation.dto';
import { ResponseMessage } from '@app/common/shared/decorators/response_message.decorator';
import { UpdateReservationDto } from './models/dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) { }

  @Post()
  @ResponseMessage("Reservation created")
  async create(@Body() dto: CreateReservationDto) {
    return await this.service.create(dto)
  }

  @Get()
  @ResponseMessage("Reservation created")
  async findAll() {
    return await this.service.findAll()
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto){
    return this.service.update(id, dto)
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
