import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // se genera automaticamente el id
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // se genera automaticamente la fecha de creacion no es necesario mandar con POST
  @CreateDateColumn()
  createdAt: Date;
}
