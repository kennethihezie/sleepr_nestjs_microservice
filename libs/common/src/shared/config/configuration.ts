import { ConfigService } from '@nestjs/config';

const config: ConfigService = new ConfigService();

export default () => ({
    mongodb: {
        url: config.get<string>('MONGODB_URL'),
    }
})