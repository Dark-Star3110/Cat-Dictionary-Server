import { DataSource } from 'typeorm';
import { Cat } from './cat.entity';

export const catProvider = [
  {
    provide: 'CAT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cat),
    inject: ['DATABASE_CONNECTION'],
  },
];
