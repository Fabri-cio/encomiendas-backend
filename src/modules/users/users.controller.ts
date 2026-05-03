import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // Protege todas las rutas de este controlador con JWT pero no esta validando que tipo de usuario es
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuario creado exitosamente',
      data: user,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'Usuarios obtenidos exitosamente',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return {
      message: 'Usuario obtenido exitosamente',
      data: user,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return {
      message: 'Usuario actualizado exitosamente',
      data: user,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    return {
      message: 'Usuario eliminado exitosamente',
      data: user,
    };
  }
}
