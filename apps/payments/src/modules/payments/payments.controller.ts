import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CREATE_CHARGE_ROUTE } from '@app/common/shared/constants/services';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}


  @MessagePattern(CREATE_CHARGE_ROUTE)
  async createCharge(@Payload() data: PaymentCreateChargeDto, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef()
    // const originalMsg = context.getMessage()

    // channel.ack(originalMsg)

    return await this.paymentsService.createCharge(data)
  }
}
