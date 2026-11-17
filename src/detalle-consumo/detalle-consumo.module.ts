
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DetalleConsumoController } from './detalle-consumo.controller';
import { DetalleConsumoService } from './detalle-consumo.service';

import {
  DetalleConsumo,
  DetalleConsumoSchema,
} from './entities/detalle-consumo.entity';

import {
  Producto,
  ProductoSchema,
} from '../producto/entities/producto.entity';

import { CuentaMesaModule } from '../cuenta-mesa/cuenta-mesa.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DetalleConsumo.name,
        schema: DetalleConsumoSchema,
      },
      {
        name: Producto.name,
        schema: ProductoSchema,
      },
    ]),
    CuentaMesaModule,
  ],
  controllers: [DetalleConsumoController],
  providers: [DetalleConsumoService],
  exports: [DetalleConsumoService],
})
export class DetalleConsumoModule {}
