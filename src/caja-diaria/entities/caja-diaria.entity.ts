
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define la estructura de la colección CajaDiaria
@Schema({ timestamps: true })
export class CajaDiaria {

  // Fecha a la que corresponde la caja diaria
  @Prop({ required: true, default: Date.now })
  fecha: Date;

  // Saldo disponible al iniciar el día o turno
  @Prop({ required: true, min: 0, default: 0 })
  saldoInicial: number;

  // Total acumulado de ingresos en el día
  @Prop({ required: true, min: 0, default: 0 })
  totalIngresos: number;

  // Total acumulado de gastos en el día
  @Prop({ required: true, min: 0, default: 0 })
  totalGastos: number;

  // Saldo resultante al cierre del día
  @Prop({ required: true, default: 0 })
  saldoFinal: number;

  // Estado de la caja: Abierta o Cerrada
  @Prop({ required: true, default: 'Abierta' })
  estado: string;
}

// Genera el esquema de Mongoose
export const CajaDiariaSchema =
  SchemaFactory.createForClass(CajaDiaria);
