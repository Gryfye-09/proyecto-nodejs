
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

// Permite actualizar parcialmente la información del usuario
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
