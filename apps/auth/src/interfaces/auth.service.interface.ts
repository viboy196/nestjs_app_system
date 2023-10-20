import { UserEntity } from '@share/domain/entities/user.entity';
import {
  UserJwt,
  UserModelRegister,
  UserModelLogin,
} from '@share/models/user.model';

export interface AuthServiceInterface {
  //   getUsers(): Promise<UserEntity[]>;
  //   getUserById(id: number): Promise<UserEntity>;
  //   findByUsername(username: string): Promise<UserEntity>;
  //   findById(id: number): Promise<UserEntity>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<UserModelRegister>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(username: string, password: string): Promise<UserEntity>;
  login(existingUser: Readonly<UserModelLogin>): Promise<{
    token: string;
    user: UserEntity;
  }>;
  verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
  //   addFriend(userId: number, friendId: number): Promise<FriendRequestEntity>;
  //   getFriends(userId: number): Promise<FriendRequestEntity[]>;
}
