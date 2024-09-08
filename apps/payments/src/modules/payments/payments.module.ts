import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { DatabaseModule } from '@app/common/modules';

@Module({
  imports: [ DatabaseModule.forFeature([]) ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}