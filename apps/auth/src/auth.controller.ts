import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { constantsInjectable } from '@constants';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitqlService } from '@share/services/rabbitql.service';
import { UserModelLogin, UserModelRegister } from '@share/models/user.model';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject(constantsInjectable.services.AuthServices)
    private readonly authService: AuthService,
    @Inject(constantsInjectable.services.RabbitqlService)
    private readonly rabbitqlService: RabbitqlService,
  ) {}

  // @MessagePattern({ cmd: 'get-users' })
  // async getUsers(@Ctx() context: RmqContext) {
  //   this.sharedService.acknowledgeMessage(context);

  //   return this.authService.getUsers();
  // }

  // @MessagePattern({ cmd: 'get-user' })
  // async getUserById(
  //   @Ctx() context: RmqContext,
  //   @Payload() user: { id: number },
  // ) {
  //   this.sharedService.acknowledgeMessage(context);

  //   return this.authService.getUserById(user.id);
  // }

  @MessagePattern({ cmd: 'register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() newUser: UserModelRegister,
  ) {
    this.rabbitqlService.acknowledgeMessage(context);

    return this.authService.register(newUser);
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Ctx() context: RmqContext,
    @Payload() existingUser: UserModelLogin,
  ) {
    this.rabbitqlService.acknowledgeMessage(context);

    return this.authService.login(existingUser);
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rabbitqlService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rabbitqlService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }
}
