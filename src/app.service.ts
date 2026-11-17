
import { Injectable } from '@nestjs/common';

// Indica que esta clase puede ser utilizada mediante inyección de dependencias
@Injectable()
export class AppService {
  // Método que devuelve un mensaje de bienvenida
  getHello(): string {
    return '¡Bienvenido a BILLPOS!';
  }
}
