import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common/shared/constants/services';
import { config } from '../../config/configuration';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE, transport: Transport.RMQ, options: {
          urls: [ config.app.rabbitMq ],
          queue: 'notifications'
        }
      }
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
