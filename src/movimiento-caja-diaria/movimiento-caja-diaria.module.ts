import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MovimientoCajaDiaria,
  MovimientoCajaDiariaSchema,
} from './entities/movimiento-caja-diaria.entity';
import { MovimientoCajaDiariaController } from './movimiento-caja-diaria.controller';
import { MovimientoCajaDiariaService } from './movimiento-caja-diaria.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovimientoCajaDiaria.name, schema: MovimientoCajaDiariaSchema },
    ]),
  ],
  controllers: [MovimientoCajaDiariaController],
  providers: [MovimientoCajaDiariaService],
  exports: [MovimientoCajaDiariaService],
})
export class MovimientoCajaDiariaModule {}
