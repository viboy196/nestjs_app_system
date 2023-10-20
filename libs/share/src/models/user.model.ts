export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}
export interface UserModelRegister {
  firstName: string;
  lastName: string;
  username: string;
  /**
   * pasword phải là anh đàn đẹp trai
   */
  password: string;
}

export interface UserModelLogin {
  username: string;
  password: string;
}

export interface UserRequest extends Request {
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
}

export interface UserJwt extends UserRequest {
  iat: number;
  exp: number;
}
