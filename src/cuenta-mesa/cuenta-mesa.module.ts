import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CuentaMesaController } from './cuenta-mesa.controller';
import { CuentaMesaService } from './cuenta-mesa.service';
import {
  CuentaMesa,
  CuentaMesaSchema,
} from './entities/cuenta-mesa.entity';

import { MesaModule } from '../mesa/mesa.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CuentaMesa.name, schema: CuentaMesaSchema },
    ]),
    MesaModule,
  ],
  controllers: [CuentaMesaController],
  providers: [CuentaMesaService],
  exports: [CuentaMesaService],
})
export class CuentaMesaModule {}
