import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitqlService } from '../services/rabbitql.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [RabbitqlService],
  exports: [RabbitqlService],
})
export class RabbitqlModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get('RABBITMQ_USER');
          const PASSWORD = configService.get('RABBITMQ_PASS');
          const HOST = configService.get('RABBITMQ_HOST');

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true, // queue survives broker restart
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RabbitqlModule,
      providers,
      exports: providers,
    };
  }
}
