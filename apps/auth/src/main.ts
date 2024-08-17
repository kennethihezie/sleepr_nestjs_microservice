import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { Logger as PinoLogger } from 'nestjs-pino/Logger';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useLogger(app.get(Logger))
  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Server Application Started!
      Auth Microserservice Started Successfully
      ------------
`);
});
