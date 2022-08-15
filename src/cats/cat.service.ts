import { Inject, Injectable } from '@nestjs/common';
import { dataSource } from '../databases/database.provider';
import { ApiResponse } from '../types/ApiResponse';
import { Like, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCat } from './create-cat.dto';
import { UpdateCat } from './update-cat.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_REPOSITORY') private readonly catRepository: Repository<Cat>,
    private userService: UserService,
  ) {}

  async addCat(cat: CreateCat): Promise<ApiResponse> {
    if (cat.user.id === 0) {
      return {
        code: 401,
        success: false,
        message: 'You need to login to perform this function',
      };
    }
    const data = await this.catRepository.save(cat);
    return {
      code: 200,
      success: true,
      message: 'Add cat successfully',
      data,
    };
  }

  async getAllCat() {
    // cach dung sql
    // const data = await dataSource
    //   .getRepository(Cat)
    //   .createQueryBuilder('cat')
    //   .leftJoinAndSelect('cat.user', 'userId')
    //   .getMany();
    // return data;

    // dung orm
    const data = await this.catRepository.find({
      relations: {
        user: true,
      },
    });
    // data.map((cat) => {
    //   cat = {
    //     ...cat,
    //     user: {
    //       ...cat.user,
    //       email: '',
    //       password: '',
    //     },
    //   };
    //   return cat;
    // });
    return data;
  }

  getCatById(catId: number) {
    return this.catRepository.findOne({
      where: {
        id: catId,
      },
      relations: {
        user: true,
      },
    });
  }

  getCatByName(catName: string) {
    return this.catRepository.find({
      where: {
        name: Like(`%${catName}%`),
      },
      relations: {
        user: true,
      },
    });
  }

  async updateCatById(catId: number, cat: UpdateCat): Promise<ApiResponse> {
    const existingCat = await this.getCatById(catId);
    if (!existingCat) {
      return {
        code: 404,
        success: false,
        message: 'Cat not found',
      };
    }
    if (cat.user.id !== existingCat.user.id) {
      return {
        code: 401,
        success: false,
        message: 'Unable to take action',
      };
    }
    const result = await dataSource
      .createQueryBuilder()
      .update(Cat)
      .set(cat)
      .where('id = :id', { id: catId })
      .execute();
    if (result.affected > 0) {
      return {
        code: 201,
        success: true,
        message: `cat was successfully updated`,
      };
    }
    return {
      code: 500,
      success: false,
      message: 'server error',
    };
  }

  async deleteCatById(catId: number): Promise<ApiResponse> {
    const result = await this.catRepository.delete(catId);
    if (result.affected > 0) {
      return {
        code: 202,
        success: true,
        message: `cat id: ${catId} was successfully deleted`,
      };
    }
    return {
      code: 500,
      success: false,
      message: 'server error',
    };
  }
}
