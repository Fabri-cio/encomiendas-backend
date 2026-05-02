import { Inject, Injectable } from '@nestjs/common';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encomienda } from './entities/encomienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EncomiendasService {
  constructor(
    @InjectRepository(Encomienda)
    private encomiendaRepository: Repository<Encomienda>,
  ) {}

  //Crear encomienda con codigo de seguimiento
  async create(createEncomiendaDto: CreateEncomiendaDto) {
    //generar codigo unico
    const codigo = 'ENC-' + Date.now();

    const encomienda = this.encomiendaRepository.create({
      ...createEncomiendaDto,
      codigoSeguimiento: codigo,
    });
    return await this.encomiendaRepository.save(encomienda);
  }

  // obtener toda las encomiendas
  async findAll() {
    return await this.encomiendaRepository.find({
      order: {
        creadoEn: 'DESC', // ordenar por fecha de creación descendente osea la mas reciente primero
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} encomienda`;
  }

  update(id: number, updateEncomiendaDto: UpdateEncomiendaDto) {
    return `This action updates a #${id} encomienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} encomienda`;
  }
}
