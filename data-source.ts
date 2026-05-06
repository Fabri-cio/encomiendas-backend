import 'dotenv/config'; //carga variables de entorno desde .env
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: isProd ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
  synchronize: false,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});
