
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define la estructura de la colección Usuario en MongoDB
@Schema({ timestamps: true })
export class Usuario {

  // Nombre completo del usuario
  @Prop({ required: true, trim: true })
  nombre: string;

  // Nombre único para inicio de sesión
  @Prop({ required: true, unique: true, trim: true })
  usuario: string;

  // Contraseña de acceso
  @Prop({ required: true })
  contrasena: string;
}

// Genera el esquema de Mongoose
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
