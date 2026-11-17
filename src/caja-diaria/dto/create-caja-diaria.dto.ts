
import {
  IsNumber,
  IsDateString,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateCajaDiariaDto {

  // Fecha de la caja diaria
  @IsDateString()
  @IsOptional()
  fecha?: string;

  // Saldo inicial de la caja diaria
  @IsNumber()
  @Min(0)
  @IsOptional()
  saldoInicial?: number;
}
