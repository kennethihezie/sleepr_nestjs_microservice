import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../shared/config/configuration';

const config = configuration()

@Module({
    imports: [MongooseModule.forRoot(config.mongodb.url)]
})
export class DatabaseModule { }
