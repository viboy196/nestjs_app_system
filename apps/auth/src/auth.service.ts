import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { UserRepositoryInterface } from '@data/interfaces/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@share/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  UserJwt,
  UserModelRegister,
  UserModelLogin,
} from '@share/models/user.model';
@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
    // @Inject('FriendRequestsRepositoryInterface')
    // private readonly friendRequestsRepository: FriendRequestsRepository,
    private readonly jwtService: JwtService,
  ) {}

  // async getUsers(): Promise<UserEntity[]> {
  //   return await this.usersRepository.findAll();
  // }

  // async getUserById(id: number): Promise<UserEntity> {
  //   return await this.usersRepository.findOneById(id);
  // }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { username },
      select: ['id', 'firstName', 'lastName', 'username', 'password'],
    });
  }

  // async findById(id: number): Promise<UserEntity> {
  //   return this.usersRepository.findOneById(id);
  // }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<UserModelRegister>): Promise<UserEntity> {
    const { firstName, lastName, username, password } = newUser;

    const existingUser = await this.findByUsername(username);

    if (existingUser) {
      throw new ConflictException(
        'An account with that username already exists!',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.usersRepository.save({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    delete savedUser.password;
    return savedUser;
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.findByUsername(username);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(existingUser: Readonly<UserModelLogin>) {
    const { username, password } = existingUser;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if (!jwt) return;

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // async addFriend(
  //   userId: number,
  //   friendId: number,
  // ): Promise<FriendRequestEntity> {
  //   const creator = await this.findById(userId);
  //   const receiver = await this.findById(friendId);

  //   return await this.friendRequestsRepository.save({ creator, receiver });
  // }

  // async getFriends(userId: number): Promise<FriendRequestEntity[]> {
  //   const creator = await this.findById(userId);

  //   return await this.friendRequestsRepository.findWithRelations({
  //     where: [{ creator }, { receiver: creator }],
  //     relations: ['creator', 'receiver'],
  //   });
  // }

  // async getFriendsList(userId: number) {
  //   const friendRequests = await this.getFriends(userId);

  //   if (!friendRequests) return [];

  //   const friends = friendRequests.map((friendRequest) => {
  //     const isUserCreator = userId === friendRequest.creator.id;
  //     const friendDetails = isUserCreator
  //       ? friendRequest.receiver
  //       : friendRequest.creator;

  //     const { id, firstName, lastName, username } = friendDetails;

  //     return {
  //       id,
  //       username,
  //       firstName,
  //       lastName,
  //     };
  //   });

  //   return friends;
  // }
}
