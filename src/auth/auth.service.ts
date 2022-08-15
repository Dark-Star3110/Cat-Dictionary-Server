import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { AuthPayload } from './interfaces/auth-payload';
import * as moment from 'moment';
import { ApiResponse } from '../types/ApiResponse';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    return user ? true : false;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storedPasswordHashed: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHashed);
  }

  async authentication(email: string, password: string): Promise<ApiResponse> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return {
        code: 404,
        success: false,
        message: 'USER_NOT_FOUND',
      };
    }
    const check = await this.comparePassword(password, user.password);
    if (!check) {
      return {
        code: 401,
        success: false,
        message: 'INVALID_PASSWORD',
      };
    }
    return {
      code: 200,
      success: true,
      message: 'AUTHENTICATON SUCCESS',
      data: user,
    };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async login(user: User) {
    const payload: AuthPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    };
    const expires = 30;

    return {
      expiresIn: moment().add(expires, 'days'),
      token: this.jwtService.sign(payload),
      message: 'login successfully',
    };
  }

  async checkAuth(token: string): Promise<User> {
    const data = await this.jwtService.verify(token);
    if (!data) {
      return null;
    }
    const user = await this.userService.getUserById(data.id);
    if (!user) return null;
    return user;
  }
}
