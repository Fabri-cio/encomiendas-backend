import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EncomiendasService } from './encomiendas.service';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';

@Controller('encomiendas')
export class EncomiendasController {
  constructor(private readonly encomiendasService: EncomiendasService) {}

  @Post()
  async create(@Body() createEncomiendaDto: CreateEncomiendaDto) {
    const encomienda =
      await this.encomiendasService.create(createEncomiendaDto);

    return {
      message: 'Encomienda creada exitosamente',
      data: encomienda,
    };
  }

  @Get()
  async findAll() {
    const encomiendas = await this.encomiendasService.findAll();

    return {
      message: 'Encomiendas obtenidas exitosamente',
      data: encomiendas,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const encomienda = await this.encomiendasService.findOne(+id);

    return {
      message: 'Encomienda obtenida exitosamente',
      data: encomienda,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncomiendaDto: UpdateEncomiendaDto,
  ) {
    return this.encomiendasService.update(+id, updateEncomiendaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // no hace falta await porque nest internamente hace el await
    // solo se usa await si necesitamos hacer algo antes de retornar la respuesta
    return this.encomiendasService.remove(+id);
  }
  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.encomiendasService.restore(+id);
  }
}
