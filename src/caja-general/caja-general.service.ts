
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CajaGeneral } from './entities/caja-general.entity.js';
import { CreateCajaGeneralDto } from './dto/create-caja-general.dto.js';
import { UpdateCajaGeneralDto } from './dto/update-caja-general.dto.js';

@Injectable()
export class CajaGeneralService {
  constructor(
    @InjectModel(CajaGeneral.name)
    private readonly cajaGeneralModel: Model<CajaGeneral>,
  ) {}

  // Crear una caja general
  async create(createCajaGeneralDto: CreateCajaGeneralDto) {
    return this.cajaGeneralModel.create(createCajaGeneralDto);
  }

  // Consultar todas las cajas generales
  async findAll() {
    return this.cajaGeneralModel.find();
  }

  // Consultar una caja general por su ID
  async findOne(id: string) {
    this.validarId(id);

    const caja = await this.cajaGeneralModel.findById(id);

    if (!caja) {
      throw new NotFoundException(
        `No existe una caja general con el id ${id}`,
      );
    }

    return caja;
  }

  // Actualizar una caja general
  async update(id: string, updateCajaGeneralDto: UpdateCajaGeneralDto) {
    this.validarId(id);

    const caja = await this.cajaGeneralModel.findByIdAndUpdate(
      id,
      updateCajaGeneralDto,
      { returnDocument: 'after', runValidators: true },
    );

    if (!caja) {
      throw new NotFoundException(
        `No existe una caja general con el id ${id}`,
      );
    }

    return caja;
  }

  // Eliminar una caja general
  async remove(id: string) {
    this.validarId(id);

    const caja = await this.cajaGeneralModel.findByIdAndDelete(id);

    if (!caja) {
      throw new NotFoundException(
        `No existe una caja general con el id ${id}`,
      );
    }

    return {
      mensaje: 'La caja general fue eliminada',
      caja,
    };
  }

  // Validar el formato del ID de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
