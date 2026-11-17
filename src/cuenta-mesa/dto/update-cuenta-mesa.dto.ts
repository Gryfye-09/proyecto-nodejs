import { IsIn, IsOptional } from 'class-validator';

export class UpdateCuentaMesaDto {
    @IsOptional()
    @IsIn(['Abierta', 'Cerrada'])
    estado?: string;
}
