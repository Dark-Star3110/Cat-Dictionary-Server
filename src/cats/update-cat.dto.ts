import { User } from '../users/user.entity';

export interface UpdateCat {
  name: string | undefined;

  origin: string | undefined;

  lifeSpan: string | undefined;

  description: string | undefined;

  imgUrl: string | undefined;

  user: User | undefined;
}
