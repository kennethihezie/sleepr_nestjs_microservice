import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config  = { 
    app: {
        port: configService.get<number>('PORT'),
        baseUrl: configService.get<string>('BASE_URL'),
    },
    rabbitMq: {
        url: configService.get<string>('RABBIT_MQ_URI')
    }
}
