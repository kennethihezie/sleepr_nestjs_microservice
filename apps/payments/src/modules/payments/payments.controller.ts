import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_CHARGE_ROUTE } from '@app/common/shared/constants/services';
import { CreateChargeDto } from '../../../../../libs/common/src/shared/dto/create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}


  @MessagePattern(CREATE_CHARGE_ROUTE)
  async createCharge(@Payload() data: CreateChargeDto) {
    return await this.paymentsService.createCharge(data)
  }
}
