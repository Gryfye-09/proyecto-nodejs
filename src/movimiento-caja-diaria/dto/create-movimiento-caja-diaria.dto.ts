
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsMongoId,
  Min,
} from 'class-validator';

export class CreateMovimientoCajaDiariaDto {

  // Identificador de la caja diaria a la que pertenece
  @IsMongoId()
  idCaja: string;

  // Identificador de la cuenta de mesa relacionada, si aplica
  @IsMongoId()
  @IsOptional()
  idCuenta?: string;

  // Fecha y hora del movimiento
  @IsDateString()
  @IsOptional()
  fechaHora?: string;

  // Tipo de movimiento: ingreso o gasto
  @IsString()
  @IsNotEmpty()
  tipo: string;

  // Concepto o descripción del movimiento
  @IsString()
  @IsNotEmpty()
  concepto: string;

  // Valor del movimiento
  @IsNumber()
  @Min(0)
  valor: number;
}
