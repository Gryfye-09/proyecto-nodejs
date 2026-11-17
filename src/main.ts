
// Permite crear e iniciar la aplicación NestJS
import { NestFactory } from '@nestjs/core';

// Importa ValidationPipe para validar los datos que recibe la API
import { ValidationPipe } from '@nestjs/common';

// Importa el módulo principal de la aplicación
import { AppModule } from './app.module';

// Función encargada de iniciar y configurar el servidor
async function bootstrap() {
  // Crea la aplicación utilizando el módulo principal
  const app = await NestFactory.create(AppModule);

  // Configura las validaciones globales para los datos recibidos
  app.useGlobalPipes(
    new ValidationPipe({
      // Elimina las propiedades que no estén definidas en los DTO
      whitelist: true,

      // Permite transformar los datos recibidos según los tipos definidos
      transform: true,
    }),
  );

  // Inicia el servidor en el puerto definido en .env
  // Si no existe esa variable, utiliza el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecuta la función de inicio de la aplicación
void bootstrap();
