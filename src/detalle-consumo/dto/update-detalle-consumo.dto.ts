
import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class UpdateDetalleConsumoDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  cantidad?: number;
}
