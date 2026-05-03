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
import { EncomiendasService } from './encomiendas.service';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// @UseGuards(JwtAuthGuard, RolesGuard) //TODAS las rutas requieren login + roles
@Controller('encomiendas')
export class EncomiendasController {
  constructor(private readonly encomiendasService: EncomiendasService) {}

  //crear encomienda
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERADOR')
  @Post()
  async create(@Body() createEncomiendaDto: CreateEncomiendaDto) {
    const encomienda =
      await this.encomiendasService.create(createEncomiendaDto);

    return {
      message: 'Encomienda creada exitosamente',
      data: encomienda,
    };
  }

  //obtener todas las encomiendas
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERADOR')
  @Get()
  async findAll() {
    const encomiendas = await this.encomiendasService.findAll();

    return {
      message: 'Encomiendas obtenidas exitosamente',
      data: encomiendas,
    };
  }

  //obtener una encomienda por id
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERADOR')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const encomienda = await this.encomiendasService.findOne(+id);

    return {
      message: 'Encomienda obtenida exitosamente',
      data: encomienda,
    };
  }

  //actualizar encomienda
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERADOR')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncomiendaDto: UpdateEncomiendaDto,
  ) {
    return this.encomiendasService.update(+id, updateEncomiendaDto);
  }

  //eliminar encomienda
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    // no hace falta await porque nest internamente hace el await
    // solo se usa await si necesitamos hacer algo antes de retornar la respuesta
    return this.encomiendasService.remove(+id);
  }

  //restaurar encomienda
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.encomiendasService.restore(+id);
  }

  //obtener tracking
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERADOR')
  @Get('tracking/:id')
  async getTracking(@Param('id') id: string) {
    const data = await this.encomiendasService.getTracking(+id);

    return {
      message: 'Tracking obtenido exitosamente',
      data,
    };
  }
}
