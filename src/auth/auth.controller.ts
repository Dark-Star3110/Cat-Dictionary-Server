import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { User } from 'src/users/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { ApiResponse } from '../types/ApiResponse';
import { LocalAuthGuard } from './guards/local.guard';
// import { AuthenticationGuard } from './guards/auth.guard';
// import { LocalStrategy } from './strategies/local.strategy';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // register user
  @Post('/register')
  async registerUser(@Body() user: CreateUserDto) {
    const isExisting = await this.authService.validateUser(user.email);
    if (isExisting) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await this.authService.hashPassword(user.password);
    return this.userService.addUser(user);
  }

  // handle login basic
  // @Post('/login')
  // async login(@Body() userLogin: { email: string; password: string }) {
  //   console.log(userLogin);

  //   const res = await this.authService.authentication(
  //     userLogin.email,
  //     userLogin.password,
  //   );
  //   if (!res.success) {
  //     if (res.message === 'USER_NOT_FOUND') {
  //       throw new HttpException(
  //         { message: 'User not found' },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     } else if (res.message === 'INVALID_PASSWORD') {
  //       throw new HttpException(
  //         { message: 'invalid password' },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   }
  //   return this.authService.login(res.data);
  // }

  @Get('/user')
  async loginByToken(@Req() req: Request): Promise<ApiResponse> {
    const token = req.cookies['token'];
    if (!token)
      return {
        code: 401,
        success: false,
        message: 'Invalid token',
      };
    const check = await this.authService.checkAuth(token);
    if (!check) {
      return {
        code: 401,
        success: false,
        message: 'Invalid token',
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, cats, ...user } = check;
    return {
      code: 200,
      success: true,
      message: 'token verified successfully',
      data: user,
    };
  }

  // handle login Guards
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() request) {
    // console.log(request.user);
    return this.authService.login(request.user);
  }

  // @UseGuards(AuthenticationGuard)
  // @Get('users/:id')
  // async getUserById(@Param() params): Promise<User> {
  //   const user = await this.userService.getUserById(params.id);
  //   if (!user) {
  //     throw new HttpException(
  //       { message: 'User is not found' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return user;
  // }
}
