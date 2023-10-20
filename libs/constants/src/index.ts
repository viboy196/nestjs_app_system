export const constantsInjectable = {
  services: {
    MICROSERVICES_AUTH_SERVICE: 'AUTH_SERVICE',
    AuthServices: 'AuthServices',
    RabbitqlService: 'RabbitqlService',
  },
  domain: {
    user: 'user',
  },
  repository: {
    UsersRepository: 'UsersRepository',
  },
  // rabbit: {
  //     RABBITMQ_DEFAULT_USER: "user",
  //     RABBITMQ_DEFAULT_PASS: "password",
  //     RABBITMQ_USER: "user",
  //     RABBITMQ_PASS: "password",
  //     RABBITMQ_HOST: "rabbitmq:5672",
  //     RABBITMQ_AUTH_QUEUE: "auth_queue",
  //     RABBITMQ_PRESENCE_QUEUE: "presence_queue",
  //     RABBITMQ_CHAT_QUEUE: "chat_queue",
  // }
};
