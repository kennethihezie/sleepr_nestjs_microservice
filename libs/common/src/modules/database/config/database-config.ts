import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dbConfig = {
  uri: configService.get<string>('MONGODB_URL'),
  dbName: configService.get<string>('DB_NAME'),
};
