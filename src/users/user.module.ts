import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonWebTokenStrategy } from '../auth/strategies/jwt.strategy';
import { DatabaseModule } from '../databases/database.module';
import { User } from './user.entity';
import { userProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  providers: [...userProvider, UserService, JsonWebTokenStrategy],
  exports: [UserService],
})
export class UserModule {}
