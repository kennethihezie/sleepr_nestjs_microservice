import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ CommonService ],
  exports: [ CommonService ],
  imports: [ ConfigModule.forRoot({isGlobal: true}), DatabaseModule ],
})
export class CommonModule {}
