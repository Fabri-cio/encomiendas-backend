import { SetMetadata } from '@nestjs/common';

//le dice al endpoit que roles pueden entrar aqui
//NO valida nada por sí solo
//solo guarda metadata
//guarda internamente:
//roles = ['ADMIN']
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
