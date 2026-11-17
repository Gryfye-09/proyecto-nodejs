
import {Controller, Get, Post, Body, Param, Patch,
} from '@nestjs/common';

import { CuentaMesaService } from './cuenta-mesa.service';
import { CreateCuentaMesaDto } from './dto/create-cuenta-mesa.dto';

@Controller('cuentas-mesa')
export class CuentaMesaController {
    constructor(
        private readonly cuentaMesaService: CuentaMesaService,
    ) {}

    // Abrir una cuenta
    @Post()
    create(@Body() createCuentaMesaDto: CreateCuentaMesaDto) {
        return this.cuentaMesaService.create(createCuentaMesaDto);
    }

    // Consultar todas las cuentas
    @Get()
    findAll() {
        return this.cuentaMesaService.findAll();
    }

    // Consultar una cuenta
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cuentaMesaService.findOne(id);
    }

  // Cerrar una cuenta
    @Patch(':id/cerrar')
    close(@Param('id') id: string) {
        return this.cuentaMesaService.close(id);
    }
}
