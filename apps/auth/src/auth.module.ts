import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { RabbitqlModule } from '@share/modules/rabbitmq.module';
import { PostgresDBModule } from '@share/modules/postgresdb.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@share/domain/entities/user.entity';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';
import { constantsInjectable } from '@constants';
import { UsersRepository } from '@data/repositories/users.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRESIN') },
      }),
      inject: [ConfigService],
    }),
    RabbitqlModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    JwtGuard,
    JwtStrategy,
    {
      provide: constantsInjectable.services.AuthServices,
      useClass: AuthService,
    },
    {
      provide: constantsInjectable.repository.UsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class AuthModule {}
