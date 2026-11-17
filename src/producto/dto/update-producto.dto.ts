
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

// Hereda los campos del DTO de creación,
// pero permite enviar solamente los que se desean modificar
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
