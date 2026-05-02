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
    const encomienda = await this.encomiendasService.create(createEncomiendaDto);
    
    return {
      message: 'Encomienda creada exitosamente',
      data: encomienda,
    };
  }

  @Get()
  findAll() {
    return this.encomiendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encomiendasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncomiendaDto: UpdateEncomiendaDto,
  ) {
    return this.encomiendasService.update(+id, updateEncomiendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encomiendasService.remove(+id);
  }
}
