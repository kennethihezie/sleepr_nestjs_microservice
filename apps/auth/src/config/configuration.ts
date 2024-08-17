import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config = {
    app: {
        port: configService.get<number>('PORT')
    },
    jwt: {
        jwtSecret: configService.get<string>('JWT_SECRET'),
        jwtRefreshSecret: configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: configService.get<number>('JWT_EXPIRES')
    }
}
