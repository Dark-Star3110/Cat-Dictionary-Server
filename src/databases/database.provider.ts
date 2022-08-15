import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0coMatkhau',
  database: 'cats',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
