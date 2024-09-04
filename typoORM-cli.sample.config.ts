import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Bootstrap',
  database: 'nestjs-blog',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
