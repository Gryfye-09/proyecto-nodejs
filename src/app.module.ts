
import { Module } from '@nestjs/common';

// Permite leer las variables del archivo .env
import { ConfigModule, ConfigService } from '@nestjs/config';

// Permite conectar NestJS con MongoDB mediante Mongoose
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Carga las variables de entorno y las hace globales
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura la conexión con MongoDB Atlas
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      // Obtiene la dirección de conexión desde el archivo .env
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),

      inject: [ConfigService],
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
