
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsMongoId,
  Min,
} from 'class-validator';

export class CreateMovimientoCajaGeneralDto {

  // Identificador de la caja general
  @IsMongoId()
  idCajaGeneral: string;

  // Identificador de la caja diaria, si está relacionado
  @IsMongoId()
  @IsOptional()
  idCajaDiaria?: string;

  // Fecha del movimiento
  @IsDateString()
  @IsOptional()
  fecha?: string;

  // Tipo de movimiento: ingreso o gasto
  @IsString()
  @IsNotEmpty()
  tipo: string;

  // Categoría del movimiento
  @IsString()
  @IsNotEmpty()
  categoria: string;

  // Concepto o descripción del movimiento
  @IsString()
  @IsNotEmpty()
  concepto: string;

  // Valor del movimiento
  @IsNumber()
  @Min(0)
  valor: number;
}
