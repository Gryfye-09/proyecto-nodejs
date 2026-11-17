
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class DetalleConsumo {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaMesa',
    required: true,
  })
  idCuenta: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
  })
  idProducto: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 1 })
  cantidad: number;

  @Prop({ type: Number, required: true, min: 0 })
  precioUnitario: number;

  @Prop({ type: Number, required: true, min: 0 })
  subtotal: number;
}

export const DetalleConsumoSchema =
  SchemaFactory.createForClass(DetalleConsumo);
