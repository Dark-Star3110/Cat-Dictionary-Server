import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  addUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  getAllUser() {
    return this.userRepository.find({});
  }

  getUserById(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        cats: true,
      },
    });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
