import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { MovimientoCajaDiaria } from './entities/movimiento-caja-diaria.entity';
import { CreateMovimientoCajaDiariaDto } from './dto/create-movimiento-caja-diaria.dto';
import { UpdateMovimientoCajaDiariaDto } from './dto/update-movimiento-caja-diaria.dto';

@Injectable()
export class MovimientoCajaDiariaService {
  constructor(
    @InjectModel(MovimientoCajaDiaria.name)
    private readonly movimientoCajaDiariaModel: Model<MovimientoCajaDiaria>,
  ) {}

  // Registra un nuevo movimiento en la caja diaria
  async create(createMovimientoCajaDiariaDto: CreateMovimientoCajaDiariaDto) {
    return this.movimientoCajaDiariaModel.create(createMovimientoCajaDiariaDto);
  }

  // Devuelve todos los movimientos de caja diaria
  async findAll() {
    return this.movimientoCajaDiariaModel.find();
  }

  // Busca UN movimiento de caja diaria por su _id
  async findOne(id: string) {
    this.validarId(id);
    const movimiento = await this.movimientoCajaDiariaModel.findById(id);
    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento de caja diaria con el id ${id}`,
      );
    }
    return movimiento;
  }

  // Cambia los campos enviados y devuelve el movimiento actualizado
  async update(
    id: string,
    updateMovimientoCajaDiariaDto: UpdateMovimientoCajaDiariaDto,
  ) {
    this.validarId(id);
    const movimiento = await this.movimientoCajaDiariaModel.findByIdAndUpdate(
      id,
      updateMovimientoCajaDiariaDto,
      { returnDocument: 'after', runValidators: true },
    );
    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento de caja diaria con el id ${id}`,
      );
    }
    return movimiento;
  }

  // Elimina el movimiento y confirma cuál fue
  async remove(id: string) {
    this.validarId(id);
    const movimiento = await this.movimientoCajaDiariaModel.findByIdAndDelete(id);
    if (!movimiento) {
      throw new NotFoundException(
        `No existe un movimiento de caja diaria con el id ${id}`,
      );
    }
    return { mensaje: 'Movimiento de caja diaria eliminado', movimiento };
  }

  // Revisa que el id tenga el formato de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
