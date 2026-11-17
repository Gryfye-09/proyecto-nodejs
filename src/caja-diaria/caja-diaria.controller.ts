import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CajaDiariaService } from './caja-diaria.service';
import { CreateCajaDiariaDto } from './dto/create-caja-diaria.dto';
import { UpdateCajaDiariaDto } from './dto/update-caja-diaria.dto';

@Controller('caja-diaria')
export class CajaDiariaController {
  constructor(private readonly cajaDiariaService: CajaDiariaService) {}

  @Post()
  create(@Body() createCajaDiariaDto: CreateCajaDiariaDto) {
    return this.cajaDiariaService.create(createCajaDiariaDto);
  }

  @Get()
  findAll() {
    return this.cajaDiariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cajaDiariaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCajaDiariaDto: UpdateCajaDiariaDto,
  ) {
    return this.cajaDiariaService.update(id, updateCajaDiariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cajaDiariaService.remove(id);
  }
}
