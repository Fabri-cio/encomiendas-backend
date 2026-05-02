import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encomienda } from './entities/encomienda.entity';
import { IsNull, Repository } from 'typeorm';
import { EstadoEncomienda } from './enums/estado-encomienda.enum';

@Injectable()
export class EncomiendasService {
  constructor(
    @InjectRepository(Encomienda)
    private encomiendaRepository: Repository<Encomienda>, //todos los repositorios acceden a la base de datos
  ) {}

  //Crear encomienda con codigo de seguimiento
  async create(createEncomiendaDto: CreateEncomiendaDto) {
    //generar codigo unico
    const codigo = 'ENC-' + Date.now();

    const encomienda = this.encomiendaRepository.create({
      //aqui no va await porque es una creacion
      ...createEncomiendaDto,
      codigoSeguimiento: codigo,
    });
    return this.encomiendaRepository.save(encomienda);
  }

  // obtener toda las encomiendas
  async findAll() {
    return this.encomiendaRepository.find({
      where: {
        // eliminadoEn: Not(IsNull()), para ver los eliminados
        eliminadoEn: IsNull(), // solo encomiendas no eliminadas
      },
      order: {
        creadoEn: 'DESC', // ordenar por fecha de creación descendente osea la mas reciente primero
      },
    });
  }

  //para obtener una encomienda
  async findOne(id: number) {
    //si no se pone await, no servira el throw NotFoundException y no mandara el 404 si no  hay el recurso
    const encomienda = await this.encomiendaRepository.findOneBy({ id }); //await porque es una consulta a la DB

    if (!encomienda) {
      //ecaptura el error, lo convierte en HTTP response, manda 404 automático
      throw new NotFoundException('Encomienda no encontrada');
    }

    return encomienda;
  }

  //para actualizar encomienda
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

  //para eliminar encomienda
  async remove(id: number) {
    const encomienda = await this.encomiendaRepository.findOne({
      where: { id },
    });

    if (!encomienda) {
      throw new NotFoundException('Encomienda no encontrada');
    }

    //regla de negocio opcional
    if (encomienda.estado === EstadoEncomienda.ENTREGADA) {
      throw new BadRequestException(
        'No se puede eliminar una encomienda entregada',
      );
    }

    await this.encomiendaRepository.softDelete(id);

    return {
      message: 'Encomienda eliminada correctamente',
    };
  }

  //para restaurar encomienda
  async restore(id: number) {
    const encomienda = await this.encomiendaRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!encomienda) {
      throw new NotFoundException('Encomienda no encontrada');
    }

    await this.encomiendaRepository.restore(id);

    return {
      message: 'Encomienda restaurada correctamente',
    };
  }
}
