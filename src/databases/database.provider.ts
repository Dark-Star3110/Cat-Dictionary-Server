import { typeOrmConfig } from '../config/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
