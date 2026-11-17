
import {IsString, IsNotEmpty, IsOptional,} from 'class-validator';

export class CreateMesaDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    estado?: string;
}
