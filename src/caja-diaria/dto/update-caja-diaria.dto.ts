
import { PartialType } from '@nestjs/mapped-types';
import { CreateCajaDiariaDto } from './create-caja-diaria.dto';

// Permite actualizar parcialmente la información de la caja diaria
export class UpdateCajaDiariaDto extends PartialType(
  CreateCajaDiariaDto,
) {}
