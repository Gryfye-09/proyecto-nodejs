import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovimientoCajaDiariaService } from './movimiento-caja-diaria.service';
import { CreateMovimientoCajaDiariaDto } from './dto/create-movimiento-caja-diaria.dto';
import { UpdateMovimientoCajaDiariaDto } from './dto/update-movimiento-caja-diaria.dto';

@Controller('movimiento-caja-diaria')
export class MovimientoCajaDiariaController {
  constructor(
    private readonly movimientoCajaDiariaService: MovimientoCajaDiariaService,
  ) {}

  @Post()
  create(
    @Body() createMovimientoCajaDiariaDto: CreateMovimientoCajaDiariaDto,
  ) {
    return this.movimientoCajaDiariaService.create(createMovimientoCajaDiariaDto);
  }

  @Get()
  findAll() {
    return this.movimientoCajaDiariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoCajaDiariaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimientoCajaDiariaDto: UpdateMovimientoCajaDiariaDto,
  ) {
    return this.movimientoCajaDiariaService.update(
      id,
      updateMovimientoCajaDiariaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoCajaDiariaService.remove(id);
  }
}
