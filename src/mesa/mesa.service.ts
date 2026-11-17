
import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Mesa } from './entities/mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaService {

    constructor(
        @InjectModel(Mesa.name)
        private mesaModel: Model<Mesa>,
    ) {}

  // Registrar una mesa
    async create(createMesaDto: CreateMesaDto) {
        const mesa = new this.mesaModel(createMesaDto);
        return await mesa.save();
    }

    // Consultar todas las mesas
    async findAll() {
        return await this.mesaModel.find().exec();
    }

    // Consultar una mesa por su ID
    async findOne(id: string) {
        if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID de mesa inválido');
        }

        const mesa = await this.mesaModel.findById(id).exec();

        if (!mesa) {
        throw new NotFoundException('Mesa no encontrada');
        }

        return mesa;
    }

    // Actualizar una mesa
    async update(id: string, updateMesaDto: UpdateMesaDto) {
        if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID de mesa inválido');
        }

        const mesa = await this.mesaModel.findByIdAndUpdate(
        id,
        updateMesaDto,
        { new: true, runValidators: true },
        ).exec();

        if (!mesa) {
        throw new NotFoundException('Mesa no encontrada');
        }

        return mesa;
    }

    // Eliminar una mesa
    async remove(id: string) {
        if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID de mesa inválido');
        }

        const mesa = await this.mesaModel.findByIdAndDelete(id).exec();

        if (!mesa) {
        throw new NotFoundException('Mesa no encontrada');
        }

        return {
        mensaje: 'Mesa eliminada correctamente',
        mesa,
        };
    }
}
