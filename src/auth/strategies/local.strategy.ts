import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    // đăng nhập bằng email và password nên phải thực hiện custom usernameField
  }

  async validate(email: string, password: string): Promise<User> {
    const res = await this.authService.authentication(email, password);
    if (!res.success) {
      throw new UnauthorizedException();
    }

    return res.data;
  }
}
