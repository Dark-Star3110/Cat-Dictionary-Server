import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CatController } from './cats/cat.controller';
import { CatModule } from './cats/cat.module';
import { typeOrmConfig } from './config/typeorm.config';
import { DatabaseModule } from './databases/database.module';
import { checkAuth } from './middleware/checkAuth.middleware';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DatabaseModule,
    CatModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkAuth).forRoutes(CatController);
  }
}
