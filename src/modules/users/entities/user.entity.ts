import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rol } from '../enums/rol.enum';

@Entity()
export class User {
  // se genera automaticamente el id
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  // se genera automaticamente la fecha de creacion no es necesario mandar con POST
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.OPERADOR,
  })
  rol: Rol;
}
