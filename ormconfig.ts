const DBConfig = {
  driver: 'pg',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0coMatkhau',
  database: 'cats',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/databases/migrations/*.js'],
  cli: { migrationsDir: 'src/databases/migrations' },
  synchronize: false,
};

export default DBConfig;
