
import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { Types, Schema as MongooseSchema } from 'mongoose';

// Define la estructura de la colección MovimientoCajaDiaria
@Schema({ timestamps: true })
export class MovimientoCajaDiaria {

  // Identificador de la caja diaria a la que pertenece
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CajaDiaria',
    required: true,
  })
  idCaja: Types.ObjectId;

  // Identificador de la cuenta de mesa relacionada, si existe
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CuentaMesa',
    required: false,
  })
  idCuenta?: Types.ObjectId;

  // Fecha y hora en la que se registra el movimiento
  @Prop({ required: true, default: Date.now })
  fechaHora: Date;

  // Tipo de movimiento: ingreso o gasto
  @Prop({ required: true, trim: true })
  tipo: string;

  // Concepto o descripción del movimiento
  @Prop({ required: true, trim: true })
  concepto: string;

  // Valor económico del movimiento
  @Prop({ required: true, min: 0 })
  valor: number;
}

// Genera el esquema de Mongoose
export const MovimientoCajaDiariaSchema =
  SchemaFactory.createForClass(MovimientoCajaDiaria);
