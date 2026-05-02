import { EstadoEncomienda } from '../enums/estado-encomienda.enum';

export class CreateEncomiendaDto {
  nombreRemitente: string;
  telefonoRemitente: string;

  nombreDestinatario: string;
  telefonoDestinatario: string;

  origen: string;
  destino: string;

  peso: number;
  descripcion?: string;

  estado?: EstadoEncomienda; //esta tipado con el enum EstadoEncomienda y no asi como string

  //id, estado, codigoSeguimiento lo maneja el backend no es necesario enviarlo
}
