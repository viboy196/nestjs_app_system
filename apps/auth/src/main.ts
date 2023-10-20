import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { RabbitqlService } from '../../../libs/share/src/services/rabbitql.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const rabbitqlService = app.get(RabbitqlService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(rabbitqlService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
