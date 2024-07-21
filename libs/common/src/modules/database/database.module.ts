import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import configuration from '../../shared/config/configuration';

const config = configuration()

@Module({
  imports: [MongooseModule.forRoot(config.mongodb.url)]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
 }
