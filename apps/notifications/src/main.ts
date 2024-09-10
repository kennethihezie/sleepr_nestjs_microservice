import { NestFactory } from '@nestjs/core';
import { NotificationRootModule } from './modules/root.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';
import { config } from './config/configuration';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { NOTIFICATION_QUEUE } from '@app/common/shared/constants/services';

async function bootstrap() {
  const app = await NestFactory.create(NotificationRootModule);
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

  app.connectMicroservice({ transport: Transport.RMQ, options: {
    urls: [ config.rabbitMq.url ],
    queue: NOTIFICATION_QUEUE
  } })

  await app.startAllMicroservices()
  
  await app.listen(config.app.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Notifications Microservice Started Successfully
      Base Url: ${config.app.baseUrl}
      ------------
`);
});
