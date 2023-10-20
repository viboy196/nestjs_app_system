import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface RabbitqlServiceInterface {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
