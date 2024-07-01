import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../helper/configuration';

const config = configuration()

@Module({
    imports: [MongooseModule.forRoot(config.mongodb.url)]
})
export class DatabaseModule { }
