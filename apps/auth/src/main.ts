import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino/Logger';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';
import { AuthRootModule } from './modules/root-module';

async function bootstrap() {
  const app = await NestFactory.create(AuthRootModule);
  app.useLogger(app.get(PinoLogger))
  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Auth Microserservice Started Successfully
      ------------
`);
});
