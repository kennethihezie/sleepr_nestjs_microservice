import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config  = { 
    app: {
        httpPort: configService.get<number>('HTTP_PORT'),
        baseUrl: configService.get<string>('BASE_URL'),
        tcpPort: configService.get<number>('TCP_PORT'),
        microserviceHost: configService.get<string>('MICRO_SERVICE_HOST')
    },
    stripe: {
        secretKey: configService.get<string>('STRIPE_SECRET_KEY'),
        publicKey: configService.get<string>('STRIPE_PUBLIC_KEY')
    }
}
