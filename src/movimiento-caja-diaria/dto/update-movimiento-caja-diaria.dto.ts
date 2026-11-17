
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoCajaDiariaDto } from './create-movimiento-caja-diaria.dto';

// Permite actualizar los datos de un movimiento de caja diaria
export class UpdateMovimientoCajaDiariaDto extends PartialType(
  CreateMovimientoCajaDiariaDto,
) {}
