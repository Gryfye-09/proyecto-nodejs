
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class CuentaMesa {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        required: true,
    })
    idMesa: mongoose.Types.ObjectId;

    @Prop({ type: Date, required: true, default: Date.now })
    horaInicio: Date;

    @Prop({ type: Date, default: null })
    horaFin: Date;

    @Prop({ type: Number, default: 0, min: 0 })
    minutosJugados: number;

    @Prop({ type: Number, default: 5000, min: 0 })
    tarifaPorHora: number;

    @Prop({ type: Number, default: 0, min: 0 })
    totalBillar: number;

    @Prop({
        type: String,
        enum: ['Abierta', 'Cerrada'],
        default: 'Abierta',
    })
    estado: string;
}

export const CuentaMesaSchema =
    SchemaFactory.createForClass(CuentaMesa);
