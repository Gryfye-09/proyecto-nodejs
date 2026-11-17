
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { Producto } from './entities/producto.entity.js';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
  ) {}

  // Crear un producto
  async create(createProductoDto: CreateProductoDto) {
    return this.productoModel.create(createProductoDto);
  }

  // Consultar todos los productos
  async findAll() {
    return this.productoModel.find();
  }

  // Consultar un producto por su ID
  async findOne(id: string) {
    this.validarId(id);

    const producto = await this.productoModel.findById(id);

    if (!producto) {
      throw new NotFoundException(
        `No existe un producto con el id ${id}`,
      );
    }

    return producto;
  }

  // Actualizar un producto
  async update(id: string, updateProductoDto: UpdateProductoDto) {
    this.validarId(id);

    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      updateProductoDto,
      { returnDocument: 'after', runValidators: true },
    );

    if (!producto) {
      throw new NotFoundException(
        `No existe un producto con el id ${id}`,
      );
    }

    return producto;
  }

  // Eliminar un producto
  async remove(id: string) {
    this.validarId(id);

    const producto = await this.productoModel.findByIdAndDelete(id);

    if (!producto) {
      throw new NotFoundException(
        `No existe un producto con el id ${id}`,
      );
    }

    return {
      mensaje: `${producto.nombre} fue eliminado`,
      producto,
    };
  }

  // Validar que el ID tenga el formato de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
