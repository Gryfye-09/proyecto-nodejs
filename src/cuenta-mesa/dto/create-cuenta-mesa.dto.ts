import { IsMongoId, IsOptional, IsDateString } from 'class-validator';

export class CreateCuentaMesaDto {
    @IsMongoId()
    idMesa: string;

    @IsOptional()
    @IsDateString()
    horaInicio?: string;
}
