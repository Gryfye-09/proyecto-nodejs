
import { PartialType } from '@nestjs/mapped-types';
import { CreateCajaGeneralDto } from './create-caja-general.dto';

// Permite actualizar parcialmente la información de la caja
export class UpdateCajaGeneralDto extends PartialType(
  CreateCajaGeneralDto,
) {}
