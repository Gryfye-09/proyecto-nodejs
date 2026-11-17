
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoCajaGeneralDto } from './create-movimiento-caja-general.dto';

// Permite actualizar los datos de un movimiento
export class UpdateMovimientoCajaGeneralDto extends PartialType(
  CreateMovimientoCajaGeneralDto,
) {}
