import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';
import { ReservationRootModule } from './modules/root.module';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(ReservationRootModule);
  app.setGlobalPrefix('api/v1');

  app.useLogger(app.get(PinoLogger))

  app.use(helmet())

  app.enableCors({
    origin: [
      config.app.baseUrl,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });
  
  await app.listen(config.app.httpPort);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Reservation Microservice Started Successfully
      Base Url: ${config.app.baseUrl}
      ------------
`);
});
