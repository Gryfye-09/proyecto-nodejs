
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovimientoCajaGeneralController } from './movimiento-caja-general.controller.js';
import { MovimientoCajaGeneralService } from './movimiento-caja-general.service.js';
import {
  MovimientoCajaGeneral,
  MovimientoCajaGeneralSchema,
} from './entities/movimiento-caja-general.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MovimientoCajaGeneral.name,
        schema: MovimientoCajaGeneralSchema,
      },
    ]),
  ],
  controllers: [MovimientoCajaGeneralController],
  providers: [MovimientoCajaGeneralService],
  exports: [MovimientoCajaGeneralService],
})
export class MovimientoCajaGeneralModule {}
