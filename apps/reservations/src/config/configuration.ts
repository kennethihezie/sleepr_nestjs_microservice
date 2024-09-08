import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config  = { 
    app: {
        httpPort: configService.get<number>('HTTP_PORT'),
        baseUrl: configService.get<string>('BASE_URL'),
        authPort: configService.get<number>('AUTH_PORT'),
        authHost: configService.get<string>('AUTH_HOST')
    }
}
