import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConfigService = new ConfigService();

export default () => ({
    mongodb: {
        url: config.get<string>('MONGODB_URL'),
    }
})
