import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRETO_SUPER_SEGURO',
    });
  }

  async validate(payload: any) {
    // este retorna el token que contiene (userId, email, rol, iat, exp)
    return {
      userId: payload.sub,
      email: payload.email,
      rol: payload.rol,
    };
  }
}
