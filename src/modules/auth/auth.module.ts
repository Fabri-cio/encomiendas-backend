import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // Importa el módulo de usuarios para poder usar el servicio
    JwtModule.registerAsync({
      inject: [ConfigService], // Inyecta el servicio de configuración
      useFactory: (config: ConfigService) => ({ // se define config como nombre del parámetro
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<number>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // jwt strategy
})
export class AuthModule {}
