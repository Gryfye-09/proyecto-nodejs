import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CuentaMesa } from './entities/cuenta-mesa.entity';
import { CreateCuentaMesaDto } from './dto/create-cuenta-mesa.dto';
import { MesaService } from '../mesa/mesa.service';

@Injectable()
export class CuentaMesaService {
    constructor(
        @InjectModel(CuentaMesa.name)
        private cuentaMesaModel: Model<CuentaMesa>,

        private mesaService: MesaService,
    ) {}

    // Abrir una cuenta para una mesa
    async create(createCuentaMesaDto: CreateCuentaMesaDto) {
        const { idMesa, horaInicio } = createCuentaMesaDto;

        // Verificar que la mesa exista
        const mesa = await this.mesaService.findOne(idMesa);

        // Verificar que la mesa esté disponible
        if (mesa.estado !== 'Disponible') {
        throw new BadRequestException(
            'La mesa no está disponible',
        );
    }

    // Evitar que una mesa tenga dos cuentas abiertas
    const cuentaAbierta = await this.cuentaMesaModel.findOne({
        idMesa: new Types.ObjectId(idMesa),
        estado: 'Abierta',
    });

    if (cuentaAbierta) {
        throw new BadRequestException(
            'La mesa ya tiene una cuenta abierta',
        );
    }

    // Crear la cuenta
    const cuenta = new this.cuentaMesaModel({
        idMesa: new Types.ObjectId(idMesa),
        horaInicio: horaInicio ? new Date(horaInicio) : new Date(),
        tarifaPorHora: 5000,
        estado: 'Abierta',
    });

    const cuentaGuardada = await cuenta.save();

    // Marcar la mesa como ocupada
    await this.mesaService.update(idMesa, {
        estado: 'Ocupada',
    });

    return cuentaGuardada;
    }

  // Consultar todas las cuentas
    async findAll() {
        return await this.cuentaMesaModel.find()
        .populate('idMesa')
        .exec();
    }

    // Consultar una cuenta por su ID
    async findOne(id: string) {
        if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID de cuenta inválido');
        }

        const cuenta = await this.cuentaMesaModel.findById(id)
        .populate('idMesa')
        .exec();

        if (!cuenta) {
        throw new NotFoundException('Cuenta no encontrada');
        }

        return cuenta;
    }

    // Cerrar una cuenta y calcular el valor
    async close(id: string) {
        const cuenta = await this.cuentaMesaModel.findById(id).exec();

        if (!cuenta) {
        throw new NotFoundException('Cuenta no encontrada');
        }

        if (cuenta.estado === 'Cerrada') {
        throw new BadRequestException(
            'Esta cuenta ya está cerrada',
        );
    }

    const horaFin = new Date();

    // Calcular los minutos utilizados, redondeando al minuto superior
    const minutosJugados = Math.ceil(
        (horaFin.getTime() - cuenta.horaInicio.getTime()) / 60000,
    );

    // Calcular el valor proporcional por minuto
    const totalBillar = Math.round(
      (minutosJugados / 60) * cuenta.tarifaPorHora,
    );

    cuenta.horaFin = horaFin;
    cuenta.minutosJugados = minutosJugados;
    cuenta.totalBillar = totalBillar;
    cuenta.estado = 'Cerrada';

    const cuentaCerrada = await cuenta.save();

    // Liberar la mesa
    await this.mesaService.update(
        cuenta.idMesa.toString(),
        { estado: 'Disponible' },
    );

    return cuentaCerrada;
    }
}
