import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EncomiendasModule } from './modules/encomiendas/encomiendas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        // desde aqui no es lo ideal para produccion porque ingresa directamente sin verificar el certificado
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    EncomiendasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
