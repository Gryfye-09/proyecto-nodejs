import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CajaDiaria } from './entities/caja-diaria.entity';
import { CreateCajaDiariaDto } from './dto/create-caja-diaria.dto';
import { UpdateCajaDiariaDto } from './dto/update-caja-diaria.dto';

@Injectable()
export class CajaDiariaService {
  constructor(
    @InjectModel(CajaDiaria.name)
    private readonly cajaDiariaModel: Model<CajaDiaria>,
  ) {}

  // Registra una nueva caja diaria
  async create(createCajaDiariaDto: CreateCajaDiariaDto) {
    return this.cajaDiariaModel.create(createCajaDiariaDto);
  }

  // Devuelve todas las cajas diarias
  async findAll() {
    return this.cajaDiariaModel.find();
  }

  // Busca UNA caja diaria por su _id
  async findOne(id: string) {
    this.validarId(id);
    const cajaDiaria = await this.cajaDiariaModel.findById(id);
    if (!cajaDiaria) {
      throw new NotFoundException(`No existe una caja diaria con el id ${id}`);
    }
    return cajaDiaria;
  }

  // Cambia los campos enviados y devuelve la caja diaria actualizada
  async update(id: string, updateCajaDiariaDto: UpdateCajaDiariaDto) {
    this.validarId(id);
    const cajaDiaria = await this.cajaDiariaModel.findByIdAndUpdate(
      id,
      updateCajaDiariaDto,
      { returnDocument: 'after', runValidators: true },
    );
    if (!cajaDiaria) {
      throw new NotFoundException(`No existe una caja diaria con el id ${id}`);
    }
    return cajaDiaria;
  }

  // Elimina la caja diaria y confirma cuál fue
  async remove(id: string) {
    this.validarId(id);
    const cajaDiaria = await this.cajaDiariaModel.findByIdAndDelete(id);
    if (!cajaDiaria) {
      throw new NotFoundException(`No existe una caja diaria con el id ${id}`);
    }
    return { mensaje: 'Caja diaria eliminada', cajaDiaria };
  }

  // Revisa que el id tenga el formato de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
