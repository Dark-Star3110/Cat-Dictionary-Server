import { User } from '../users/user.entity';

export interface CreateCat {
  name: string;

  origin: string;

  lifeSpan: string;

  description: string;

  imgUrl: string;

  user: User;
}
