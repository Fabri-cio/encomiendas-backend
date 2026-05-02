import { PartialType } from '@nestjs/mapped-types';
import { CreateEncomiendaDto } from './create-encomienda.dto';

export class UpdateEncomiendaDto extends PartialType(CreateEncomiendaDto) {}
