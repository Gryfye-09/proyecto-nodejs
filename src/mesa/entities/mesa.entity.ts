
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Mesa {

    @Prop({ required: true, trim: true })
    nombre: string;

    @Prop({ required: true, trim: true, default: 'Disponible' })
    estado: string;
}

export const MesaSchema = SchemaFactory.createForClass(Mesa);
