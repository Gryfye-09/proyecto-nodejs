
import {
  IsMongoId,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateDetalleConsumoDto {
  @IsMongoId()
  idCuenta: string;

  @IsMongoId()
  idProducto: string;

  @IsInt()
  @IsPositive()
  cantidad: number;
}
