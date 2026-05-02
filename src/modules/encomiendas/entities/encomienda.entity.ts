import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoEncomienda } from '../enums/estado-encomienda.enum';

@Entity()
export class Encomienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigoSeguimiento: string;

  @Column()
  nombreRemitente: string;

  @Column()
  telefonoRemitente: string;

  @Column()
  nombreDestinatario: string;

  @Column()
  telefonoDestinatario: string;

  //direcciones
  @Column()
  origen: string;

  @Column()
  destino: string;

  //detalle del paquete
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  peso: number;

  @Column({ nullable: true })
  descripcion: string;

  //estado del envio
  @Column({
    type: 'enum',
    enum: EstadoEncomienda,
    default: EstadoEncomienda.CREADA,
  })
  estado: EstadoEncomienda;

  //auditoria
  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
