import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    //si no se pone await, no servira el throw NotFoundException y no mandara el 404 si no  hay el recurso
    const encomienda = await this.encomiendaRepository.findOneBy({ id });

    if (!encomienda) {
      //ecaptura el error, lo convierte en HTTP response, manda 404 automático
      throw new NotFoundException('Encomienda no encontrada');
    }

    return encomienda;
  }

  update(id: number, updateEncomiendaDto: UpdateEncomiendaDto) {
    return `This action updates a #${id} encomienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} encomienda`;
  }
}
