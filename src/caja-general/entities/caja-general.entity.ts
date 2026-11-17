
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define la estructura de la colección CajaGeneral
@Schema({ timestamps: true })
export class CajaGeneral {

  // Mes al que corresponde la caja
  @Prop({ required: true, min: 1, max: 12 })
  mes: number;

  // Año al que corresponde la caja
  @Prop({ required: true, min: 2000 })
  anio: number;

  // Saldo disponible al iniciar el periodo
  @Prop({ required: true, min: 0, default: 0 })
  saldoInicial: number;

  // Total acumulado de ingresos
  @Prop({ required: true, min: 0, default: 0 })
  totalIngresos: number;

  // Total acumulado de gastos
  @Prop({ required: true, min: 0, default: 0 })
  totalGastos: number;

  // Saldo resultante de los movimientos
  @Prop({ required: true, default: 0 })
  saldoFinal: number;

  // Estado de la caja: abierta o cerrada
  @Prop({ required: true, default: 'Abierta' })
  estado: string;
}

// Genera el esquema de Mongoose
export const CajaGeneralSchema =
  SchemaFactory.createForClass(CajaGeneral);
