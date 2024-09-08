import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config } from '../../config/configuration';
import { NOTIFICATION_SERVICE, SEND_EMAIL_NOTIFICATION_EVENT } from '@app/common/shared/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';


@Injectable()
export class PaymentsService {
   constructor(@Inject(NOTIFICATION_SERVICE) private readonly notificationService: ClientProxy) {} 
   private readonly stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2024-06-20' })

   async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card
    })

    const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: amount * 100,
        confirm: true,
        payment_method_types: ['card'],
        currency: 'usd'
    })

    this.notificationService.emit(SEND_EMAIL_NOTIFICATION_EVENT, { email, text: 'Your payment was successful' })

    return paymentIntent
   }
}
