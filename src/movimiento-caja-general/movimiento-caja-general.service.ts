
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { MovimientoCajaGeneral } from './entities/movimiento-caja-general.entity.js';
import { CreateMovimientoCajaGeneralDto } from './dto/create-movimiento-caja-general.dto.js';
import { UpdateMovimientoCajaGeneralDto } from './dto/update-movimiento-caja-general.dto.js';

@Injectable()
export class MovimientoCajaGeneralService {
  constructor(
    @InjectModel(MovimientoCajaGeneral.name)
    private readonly movimientoModel: Model<MovimientoCajaGeneral>,
  ) {}

  // Registrar un movimiento de caja general
  async create(createMovimientoDto: CreateMovimientoCajaGeneralDto) {
    return this.movimientoModel.create(createMovimientoDto);
  }

  // Consultar todos los movimientos
  async findAll() {
    return this.movimientoModel.find();
  }

  // Consultar un movimiento por su ID
  async findOne(id: string) {
    this.validarId(id);

    const movimiento = await this.movimientoModel.findById(id);

    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento con el id ${id}`,
      );
    }

    return movimiento;
  }

  // Actualizar un movimiento
  async update(
    id: string,
    updateMovimientoDto: UpdateMovimientoCajaGeneralDto,
  ) {
    this.validarId(id);

    const movimiento = await this.movimientoModel.findByIdAndUpdate(
      id,
      updateMovimientoDto,
      { returnDocument: 'after', runValidators: true },
    );

    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento con el id ${id}`,
      );
    }

    return movimiento;
  }

  // Eliminar un movimiento
  async remove(id: string) {
    this.validarId(id);

    const movimiento = await this.movimientoModel.findByIdAndDelete(id);

    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento con el id ${id}`,
      );
    }

    return {
      mensaje: 'El movimiento fue eliminado',
      movimiento,
    };
  }

  // Validar el formato del ID de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
