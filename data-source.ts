import 'dotenv/config'; //carga variables de entorno desde .env
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: isProd ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
  synchronize: false,
  // en la url externa de la DB se agrega ?ssl=true al final en .env 
  // para conectarse con la DB en producción o tambien 
  // (realizar las migraciones con pnpm run migration:run)
  ssl: isProd ? { rejectUnauthorized: false } : false,
});
