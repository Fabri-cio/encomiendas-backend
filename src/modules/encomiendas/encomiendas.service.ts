import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encomienda } from './entities/encomienda.entity';
import { Repository } from 'typeorm';
import { EstadoEncomienda } from './enums/estado-encomienda.enum';

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

  //actualizar encomienda
  async update(id: number, updateEncomiendaDto: UpdateEncomiendaDto) {
    const encomienda = await this.encomiendaRepository.findOne({
      where: { id },
    }); // 🔥 FIX IMPORTANTE TAMBIÉN AQUÍ

    if (!encomienda) {
      throw new NotFoundException('Encomienda no encontrada');
    }

    // 🔥 REGLA 1: no modificar si ya fue entregada
    if (encomienda.estado === EstadoEncomienda.ENTREGADA) {
      throw new BadRequestException(
        'No se puede actualizar una encomienda entregada',
      );
    }

    Object.assign(encomienda, updateEncomiendaDto);

    return await this.encomiendaRepository.save(encomienda);
  }

  remove(id: number) {
    return `This action removes a #${id} encomienda`;
  }
}
