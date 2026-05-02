import { Module } from '@nestjs/common';
import { EncomiendasService } from './encomiendas.service';
import { EncomiendasController } from './encomiendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encomienda } from './entities/encomienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Encomienda])], // Importa el entity de encomienda para que TypeORM lo use
  controllers: [EncomiendasController],
  providers: [EncomiendasService],
})
export class EncomiendasModule {}
