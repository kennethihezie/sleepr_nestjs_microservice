import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const config = {
  app: {
    port: configService.get<number>('HTTP_PORT'),
    baseUrl: configService.get<string>('BASE_URL'),
  },
  stripe: {
    secretKey: configService.get<string>('STRIPE_SECRET_KEY'),
    publicKey: configService.get<string>('STRIPE_PUBLIC_KEY'),
  },
  rabbitMq: {
    url: configService.get<string>('RABBIT_MQ_URI'),
  },
};
