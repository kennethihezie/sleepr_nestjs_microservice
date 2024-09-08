import { NestFactory } from '@nestjs/core';
import { PaymentRootModule } from './modules/root.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';
import { config } from './config/configuration';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentRootModule);
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
    urls: [ config.app.rabbitMq ],
    queue: 'payments'
  } })

  await app.startAllMicroservices()
  
  await app.listen(config.app.httpPort);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Payments Microservice Started Successfully
      Base Url: ${config.app.baseUrl}
      ------------
`);
});
