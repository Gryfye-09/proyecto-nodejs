
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUsuarioDto {

  // Nombre completo del usuario
  @IsString()
  @IsNotEmpty()
  nombre: string;

  // Nombre de usuario para inicio de sesión
  @IsString()
  @IsNotEmpty()
  usuario: string;

  // Contraseña de acceso
  @IsString()
  @IsNotEmpty()
  contrasena: string;
}
