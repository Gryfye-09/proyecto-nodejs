
import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { Types, Schema as MongooseSchema } from 'mongoose';

// Define la estructura de la colección MovimientoCajaGeneral
@Schema({ timestamps: true })
export class MovimientoCajaGeneral {

  // Identificador de la caja general a la que pertenece
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CajaGeneral',
    required: true,
  })
  idCajaGeneral: Types.ObjectId;

  // Identificador de la caja diaria relacionada, si existe
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CajaDiaria',
    required: false,
  })
  idCajaDiaria?: Types.ObjectId;

  // Fecha en la que se registra el movimiento
  @Prop({ required: true, default: Date.now })
  fecha: Date;

  // Tipo de movimiento: ingreso o gasto
  @Prop({ required: true, trim: true })
  tipo: string;

  // Categoría del movimiento
  @Prop({ required: true, trim: true })
  categoria: string;

  // Descripción del movimiento
  @Prop({ required: true, trim: true })
  concepto: string;

  // Valor económico del movimiento
  @Prop({ required: true, min: 0 })
  valor: number;
}

// Genera el esquema de Mongoose
export const MovimientoCajaGeneralSchema =
  SchemaFactory.createForClass(MovimientoCajaGeneral);
