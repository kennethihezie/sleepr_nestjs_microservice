import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from '../database/database.module';
import { AppLoggerModule } from '../logger/logger.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DatabaseModule, AppLoggerModule],
})
export class CommonModule { }
