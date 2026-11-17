import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DetalleConsumo } from './entities/detalle-consumo.entity';
import { Producto } from '../producto/entities/producto.entity';
import { CuentaMesaService } from '../cuenta-mesa/cuenta-mesa.service';
import { CreateDetalleConsumoDto } from './dto/create-detalle-consumo.dto';

@Injectable()
export class DetalleConsumoService {
    constructor(
        @InjectModel(DetalleConsumo.name)
        private detalleModel: Model<DetalleConsumo>,

        @InjectModel(Producto.name)
        private productoModel: Model<Producto>,

        private cuentaMesaService: CuentaMesaService,
    ) {}

  // Registrar un producto consumido
    async create(dto: CreateDetalleConsumoDto) {
    // Verificar que la cuenta exista
        const cuenta = await this.cuentaMesaService.findOne(dto.idCuenta);

    // Verificar que la cuenta esté abierta
        if (cuenta.estado !== 'Abierta') {
        throw new BadRequestException(
            'No se pueden registrar consumos en una cuenta cerrada',
        );
        }

        // Buscar el producto
        const producto = await this.productoModel
        .findById(dto.idProducto)
        .exec();

        if (!producto) {
        throw new NotFoundException('Producto no encontrado');
        }

        // Descontar inventario solo si hay unidades suficientes
        const productoActualizado = await this.productoModel
        .findOneAndUpdate(
            {
            _id: dto.idProducto,
            stock: { $gte: dto.cantidad },
            },
            {
            $inc: { stock: -dto.cantidad },
            },
            { new: true },
        )
        .exec();

        if (!productoActualizado) {
        throw new BadRequestException(
            'No hay suficiente inventario para este producto',
        );
        }

        // Calcular el precio y subtotal desde la base de datos
        const precioUnitario = producto.precio;
        const subtotal = precioUnitario * dto.cantidad;

        try {
        const detalle = new this.detalleModel({
            idCuenta: new Types.ObjectId(dto.idCuenta),
            idProducto: new Types.ObjectId(dto.idProducto),
            cantidad: dto.cantidad,
            precioUnitario,
            subtotal,
        });

        return await detalle.save();
    } catch (error) {
      // Devolver inventario si no se pudo guardar el consumo
        await this.productoModel.updateOne(
            { _id: dto.idProducto },
            { $inc: { stock: dto.cantidad } },
        );

        throw error;
        }
    }

  // Consultar todos los consumos
    async findAll() {
        return await this.detalleModel
        .find()
        .populate('idCuenta')
        .populate('idProducto')
        .exec();
    }

  // Consultar consumos de una cuenta
    async findByCuenta(idCuenta: string) {
        if (!Types.ObjectId.isValid(idCuenta)) {
        throw new BadRequestException('ID de cuenta inválido');
        }

        await this.cuentaMesaService.findOne(idCuenta);

        return await this.detalleModel
        .find({ idCuenta: new Types.ObjectId(idCuenta) })
        .populate('idProducto')
        .exec();
    }

  // Eliminar un consumo y devolver inventario
async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID de consumo inválido');
    }

    const detalle = await this.detalleModel.findById(id).exec();

    if (!detalle) {
        throw new NotFoundException('Consumo no encontrado');
    }

    // No modificar consumos de cuentas cerradas
    const cuenta = await this.cuentaMesaService.findOne(
        detalle.idCuenta.toString(),
    );

    if (cuenta.estado !== 'Abierta') {
        throw new BadRequestException(
        'No se pueden eliminar consumos de una cuenta cerrada',
        );
    }

    // Devolver las unidades al inventario
    await this.productoModel.updateOne(
        { _id: detalle.idProducto },
        { $inc: { stock: detalle.cantidad } },
    );

    await detalle.deleteOne();

    return {
        mensaje: 'Consumo eliminado y stock devuelto correctamente',
    };
    }
}
