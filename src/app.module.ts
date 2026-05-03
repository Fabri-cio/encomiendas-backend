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
      useFactory: (config: ConfigService) => {
        const isProd = config.get<string>('NODE_ENV') === 'production';

        // PRODUCCIÓN (Supabase)
        if (isProd) {
          return {
            type: 'postgres',
            url: config.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: true, // luego lo cambias a false
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        // DESARROLLO (local)
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '5432'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    EncomiendasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
