import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config = {
    app: {
        httpPort: configService.get<number>('HTTP_PORT'),
        baseUrl: configService.get<string>('BASE_URL'),
        tcpPort: configService.get<number>('TCP_PORT'),
        microserviceHost: configService.get<string>('MICRO_SERVICE_HOST')
    },
    jwt: {
        jwtSecret: configService.get<string>('JWT_SECRET'),
        jwtRefreshSecret: configService.get<string>('JWT_REFRESH_SECRET'),
        jwtExpiresIn: configService.get<number>('JWT_EXPIRES'),
        jwtRefreshExpiresIn: configService.get<number>('JWT_REFRESH_EXPIRES')
    }
}
