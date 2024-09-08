import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config } from '../../config/configuration';
import { CreateChargeDto } from '../../../../../libs/common/src/shared/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
   private readonly stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2024-06-20' })

   async createCharge({ card, amount }: CreateChargeDto) {
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

    return paymentIntent
   }
}
