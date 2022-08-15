import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { userProvider } from '../users/user.provider';
import { DatabaseModule } from '../databases/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    ...userProvider,
    AuthService,
    UserService,
    LocalStrategy,
    JsonWebTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
