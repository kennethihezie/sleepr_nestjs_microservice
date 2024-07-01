import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ DatabaseModule ],
})
export class CommonModule {}
