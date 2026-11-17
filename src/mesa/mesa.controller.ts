
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';

import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesas')
export class MesaController {

    constructor(private readonly mesaService: MesaService) {}

    // Registrar mesa
    @Post()
    create(@Body() createMesaDto: CreateMesaDto) {
        return this.mesaService.create(createMesaDto);
    }

    // Listar mesas
    @Get()
    findAll() {
        return this.mesaService.findAll();
    }

    // Consultar mesa por ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mesaService.findOne(id);
    }

    // Actualizar mesa
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateMesaDto: UpdateMesaDto,
    ) {
        return this.mesaService.update(id, updateMesaDto);
    }

    // Eliminar mesa
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mesaService.remove(id);
    }
}
