import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino/Logger';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';
import { AuthRootModule } from './modules/root-module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthRootModule);
  app.setGlobalPrefix('api/v1');

  /* Used to create a microservice connection. You can select TCP, RMQ or other */
  app.connectMicroservice({ transport: Transport.TCP })
  app.useLogger(app.get(PinoLogger))

  app.enableCors({
    origin: [
      config.app.baseUrl,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  /* Allow the app to listen connections on TCP layer */
  await app.startAllMicroservices()

  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      --------------------------------------
      Auth Microservice Started Successfully
      Base Url: ${config.app.baseUrl}
      --------------------------------------
`);
});
