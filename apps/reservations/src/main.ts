import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations/reservations.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useLogger(app.get(PinoLogger))
  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Server Application Started!
      Reservation Microserservice Started Successfully
      ------------
`);
});
