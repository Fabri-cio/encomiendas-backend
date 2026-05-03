import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

// este es el que realmente protege

// Hace:

// 1. lee los roles del decorator
// 2. obtiene el usuario del request (JWT)
// 3. compara
// 4. permite o bloquea

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //1. leer roles de enpoint
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    //2. si no hay roles definidos -> deja pasar
    if (!requiredRoles) return true;

    //3. obtener usuario del request
    const { user } = context.switchToHttp().getRequest();

    //4. validar rol
    return requiredRoles.includes(user.rol);
  }
}
