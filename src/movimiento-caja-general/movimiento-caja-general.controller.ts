
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MovimientoCajaGeneralService } from './movimiento-caja-general.service.js';
import { CreateMovimientoCajaGeneralDto } from './dto/create-movimiento-caja-general.dto.js';
import { UpdateMovimientoCajaGeneralDto } from './dto/update-movimiento-caja-general.dto.js';

@Controller('movimientos-caja-general')
export class MovimientoCajaGeneralController {
  constructor(
    private readonly movimientoService: MovimientoCajaGeneralService,
  ) {}

  // Registrar un movimiento
  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoCajaGeneralDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  // Consultar todos los movimientos
  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  // Consultar un movimiento por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(id);
  }

  // Actualizar un movimiento
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimientoDto: UpdateMovimientoCajaGeneralDto,
  ) {
    return this.movimientoService.update(id, updateMovimientoDto);
  }

  // Eliminar un movimiento
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(id);
  }
}
