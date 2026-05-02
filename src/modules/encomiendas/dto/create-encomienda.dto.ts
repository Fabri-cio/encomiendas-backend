export class CreateEncomiendaDto {
  nombreRemitente: string;
  telefonoRemitente: string;

  nombreDestinatario: string;
  telefonoDestinatario: string;

  origen: string;
  destino: string;

  peso: number;
  descripcion?: string;

  //id, estado, codigoSeguimiento lo maneja el backend no es necesario enviarlo
}
