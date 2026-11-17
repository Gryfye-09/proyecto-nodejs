
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CajaGeneralService } from './caja-general.service.js';
import { CreateCajaGeneralDto } from './dto/create-caja-general.dto.js';
import { UpdateCajaGeneralDto } from './dto/update-caja-general.dto.js';

@Controller('cajas-generales')
export class CajaGeneralController {
  constructor(
    private readonly cajaGeneralService: CajaGeneralService,
  ) {}

  // Crear una caja general
  @Post()
  create(@Body() createCajaGeneralDto: CreateCajaGeneralDto) {
    return this.cajaGeneralService.create(createCajaGeneralDto);
  }

  // Consultar todas las cajas generales
  @Get()
  findAll() {
    return this.cajaGeneralService.findAll();
  }

  // Consultar una caja general por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cajaGeneralService.findOne(id);
  }

  // Actualizar una caja general
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCajaGeneralDto: UpdateCajaGeneralDto,
  ) {
    return this.cajaGeneralService.update(id, updateCajaGeneralDto);
  }

  // Eliminar una caja general
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cajaGeneralService.remove(id);
  }
}
