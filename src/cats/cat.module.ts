import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../users/user.service';
import { DatabaseModule } from '../databases/database.module';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { catProvider } from './cat.provider';
import { CatService } from './cat.service';
import { UserModule } from '../users/user.module';
import { userProvider } from '../users/user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), DatabaseModule, UserModule],
  providers: [...catProvider, ...userProvider, CatService, UserService],
  controllers: [CatController],
})
export class CatModule {}
