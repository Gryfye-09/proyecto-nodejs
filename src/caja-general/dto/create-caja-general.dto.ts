
import {
  IsNumber,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateCajaGeneralDto {

  // Mes de registro de la caja
  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  // Año de registro de la caja
  @IsInt()
  @Min(2000)
  anio: number;

  // Saldo inicial de la caja
  @IsNumber()
  @Min(0)
  @IsOptional()
  saldoInicial?: number;
}
