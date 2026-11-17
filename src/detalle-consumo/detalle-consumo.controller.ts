import {Controller, Get, Post, Delete, Body, Param} from '@nestjs/common';

import { DetalleConsumoService } from './detalle-consumo.service';
import { CreateDetalleConsumoDto } from './dto/create-detalle-consumo.dto';

@Controller('detalle-consumo')
export class DetalleConsumoController {
    constructor(
        private readonly detalleConsumoService: DetalleConsumoService,
    ) {}

    // Registrar un consumo
    @Post()
    create(@Body() createDto: CreateDetalleConsumoDto) {
        return this.detalleConsumoService.create(createDto);
    }

    // Consultar todos los consumos
    @Get()
    findAll() {
        return this.detalleConsumoService.findAll();
    }

    // Consultar consumos de una cuenta
    @Get('cuenta/:id')
    findByCuenta(@Param('id') id: string) {
        return this.detalleConsumoService.findByCuenta(id);
    }

    // Eliminar un consumo
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.detalleConsumoService.remove(id);
    }
}
