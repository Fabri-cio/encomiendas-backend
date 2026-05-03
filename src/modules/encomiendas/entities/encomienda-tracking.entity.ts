import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoEncomienda } from '../enums/estado-encomienda.enum';
import { Encomienda } from './encomienda.entity';

@Entity()
export class EncomiendaTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EstadoEncomienda,
  })
  estado: EstadoEncomienda;

  @Column({ nullable: true })
  descripcion: string; // opcional ej salio del almacén

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Encomienda, (encomienda) => encomienda.tracking, {
    onDelete: 'CASCADE',
  })
  encomienda: Encomienda;
}
