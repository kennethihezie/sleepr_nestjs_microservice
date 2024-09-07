import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';
import { ReservationRootModule } from './modules/root-module';


async function bootstrap() {
  const app = await NestFactory.create(ReservationRootModule);
  app.useLogger(app.get(PinoLogger))
  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Reservation Microservice Started Successfully
      ------------
`);
});
