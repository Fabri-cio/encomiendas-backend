import { PartialType } from '@nestjs/mapped-types';
import { CreateEncomiendaDto } from './create-encomienda.dto';

//con partialType, todos los campos son opcionales (PATCH)
//ya no es necesario validar todos los campos
export class UpdateEncomiendaDto extends PartialType(CreateEncomiendaDto) {}
