
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define la estructura de la colección Producto en MongoDB
@Schema({ timestamps: true })
export class Producto {

  // Nombre del producto
  @Prop({ required: true, trim: true })
  nombre: string;

  // Categoría a la que pertenece el producto
  @Prop({ required: true, trim: true })
  categoria: string;

  // Precio de venta del producto
  @Prop({ required: true, min: 0 })
  precio: number;

  // Cantidad disponible en inventario
  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  // Cantidad mínima permitida antes de generar una alerta
  @Prop({ required: true, min: 0, default: 0 })
  stockMinimo: number;
}

// Genera el esquema que utilizará Mongoose
export const ProductoSchema = SchemaFactory.createForClass(Producto);
