
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductoDto {

  // Nombre del producto
  @IsString()
  @IsNotEmpty()
  nombre: string;

  // Categoría del producto
  @IsString()
  @IsNotEmpty()
  categoria: string;

  // Precio del producto
  @IsNumber()
  @Min(0)
  precio: number;

  // Cantidad disponible
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  // Cantidad mínima de inventario
  @IsNumber()
  @Min(0)
  @IsOptional()
  stockMinimo?: number;
}
